angular.module('cheatsheet')
    .service('csfAceEditor', [
        '$rootScope', 'csfUserSettings',
        function($rootScope, csfUserSettings) {
            var me = this,
                $aceEditorElement,
                aceEditor,
                deregisterRootScopeWatch,
                eventHandlers = {
                    release : null
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

                        if(typeof me.onRelease === 'function') {
                            me.onRelease();
                        }

                        $aceEditorElement.prev().css('minHeight', '');
                        $aceEditorElement.appendTo( $('#aceEditorDock') );
                    }
                });

                csfUserSettings.UserSettingsPromise
                    .then(function(userSettings) {
                        deregisterRootScopeWatch = $rootScope.$watch(
                            function() {
                                return userSettings.instance.editor;
                            },
                            function(newValue, oldValue) {
                                if( newValue && newValue.theme ) {
                                    aceEditor.setTheme(newValue.theme);
                                }
                                if( newValue && newValue.fontSize ) {
                                    aceEditor.setFontSize( parseInt(newValue.fontSize, 10) )
                                }
                            },
                            true
                        );
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
             * Assign a callback to be executed before the editor is released from its current position.
             * 
             * @type {function}
             */
            this.onRelease = null;

            /**
             * Destroys the ace editor instance.
             * 
             * There shouldn't be a need for this but it's there if you need it. For example can be called on logout.
             */
            this.destroy = function() {
                if(typeof deregisterRootScopeWatch == 'function') {
                    deregisterRootScopeWatch();
                }
                deregisterRootScopeWatch = null;

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
