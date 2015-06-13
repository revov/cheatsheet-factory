angular.module('cheatsheet')
    .service('csfAceEditor', [
        '$rootScope', '$meteor',
        function($rootScope, $meteor) {
            var me = this,
                $aceEditorElement,
                aceEditor,
                stopComputation,
                eventHandlers = {
                    once: {
                        release : []
                    }
                };

            function init() {
                $aceEditorElement = $('<div/>', {id: 'aceEditor'});
                $('body').append(
                    $('<div/>', {id:'aceEditorDock'})
                        .append( $('<div/>') )
                        .append( $aceEditorElement )
                );
                $('#aceEditorDock').hide();

                aceEditor = ace.edit("aceEditor");
                aceEditor.$blockScrolling = Infinity;
                aceEditor.setOptions({
                    enableBasicAutocompletion: true
                });

                aceEditor.commands.addCommand({
                    name: 'releaseEditor',
                    bindKey: {
                        win: 'esc',
                        mac: 'esc'
                    },
                    exec: function(env, args, request) {
                        if( !aceEditor ) {
                            return;
                        }

                        while (eventHandlers.once.release.length){
                            eventHandlers.once.release.shift().call();
                        }

                        $aceEditorElement.prev().css('minHeight', '');
                        $aceEditorElement.appendTo( $('#aceEditorDock') );
                    }
                });

                Meteor.autorun(function(computation) {
                    var currentUser = Meteor.user();
                    if(!currentUser) {
                        return;
                    } else {
                        stopComputation = computation.stop;
                    }

                    var editorSettings = currentUser.profile.userSettings.editor;
                    aceEditor.setTheme(editorSettings.theme);
                    aceEditor.setFontSize( parseInt(editorSettings.fontSize, 10) );
                    $rootScope.$applyAsync();
                });
            }

            /**
             * 
             * @param $container a jQuery container to which the editor will be appended
             * @returns {*} The Ace editor instance
             */
            this.acquire = function( $container ) {
                if( !aceEditor ) {
                    init();
                } else {
                    me.release();
                }

                aceEditor.setValue('', 0);
                aceEditor.getSession().getUndoManager().reset();
                $aceEditorElement.appendTo( $container );
                $aceEditorElement.prev().css('minHeight', '13em');
                aceEditor.resize();

                return aceEditor;
            };

            /**
             * Release the editor from its current position
             */
            this.release = function() {
                if( !aceEditor ) {
                    return;
                }
                
                aceEditor.execCommand('releaseEditor');
            };

            /**
             * Registers an event handler to be executed just once
             * Events:
             *     release: called just before the editor is released
             * 
             * @type {function}
             */
            this.once = function(eventName, callback) {
                if(!typeof callback === 'function' || !eventHandlers.once.hasOwnProperty(eventName)) {
                    return;
                }

                eventHandlers.once[eventName].push(callback);
            };

            /**
             * Destroys the ace editor instance.
             * 
             * There shouldn't be a need for this but it's there if you need it. For example can be called on logout.
             */
            this.destroy = function() {
                if(typeof stopComputation == 'function') {
                    stopComputation();
                }
                stopComputation = null;

                if( aceEditor && typeof aceEditor.destroy == 'function') {
                    aceEditor.destroy();
                }
                aceEditor = null;

                if( $aceEditorElement && typeof $aceEditorElement.remove == 'function') {
                    $aceEditorElement.remove();
                }
                $aceEditorElement = null;

                $('#aceEditorDock').remove();
            };
        }
    ]);
