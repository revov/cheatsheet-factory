angular.module('cheatsheet')
    .service('csfAceEditor', [
        '$rootScope', 'csfUserSettings',
        function($rootScope, csfUserSettings) {
            var me = this,
                $aceEditorElement,
                aceEditor,
                deregisterRootScopeWatch;

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



            this.acquire = function( $container ) {
                if( !aceEditor ) {
                    init();
                }

                $aceEditorElement.appendTo( $container );
                aceEditor.resize();

                return aceEditor;
            };

            this.release = function() {
                if( !aceEditor ) {
                    return;
                }

                aceEditor.setValue('');
                aceEditor.getSession().getUndoManager().reset();
                $aceEditorElement.appendTo( $('#aceEditorDock') );
            };

            // There shouldn't be a need for this but it's there if you need it. For example can be called on logout.
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
