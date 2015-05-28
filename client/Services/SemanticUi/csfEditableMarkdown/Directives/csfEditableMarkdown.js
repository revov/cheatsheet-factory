angular.module('cheatsheet')
    .directive('csfEditableMarkdown', [
        'csfMarkdown', 'csfUserSettings', 'csfAceEditor',
        function(csfMarkdown, csfUserSettings, csfAceEditor) {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/SemanticUi/csfEditableMarkdown/Templates/csfEditableMarkdown.ng.html',
                scope: {
                    text: '=',
                    canEdit: '='
                },
                link: function(scope, element, attrs) {
                    /**
                     * Markdown
                     */
                    var markdownContainer = element.find('.csf-markdown-container');

                    function render() {
                        if( typeof scope.text !== 'string' || scope.text.trim() == '' ) {
                            markdownContainer.html('<div class="ui yellow message">Field is empty</div>');
                            return;
                        }

                        var compiled = csfMarkdown.render(scope.text, scope.UserSettings.instance);
                        markdownContainer.html(compiled);
                    }

                    /**
                     * Actions
                     */
                    scope.enableEditing = function() {
                        if(!scope.canEdit) { return; }
                        if(scope.isEditing) { return; }

                        scope.isEditing = true;

                        var editor = csfAceEditor.acquire( element.find('.csf-markdown-wrapper') );
                        var session = editor.getSession();
                        session.setMode("ace/mode/markdown");
                        editor.setValue(scope.text);
                        editor.selection.clearSelection();

                        csfAceEditor.onRelease = function(env, args, request) {
                            scope.text = editor.getValue();
                            scope.isEditing = false;
                            csfAceEditor.onRelease = null; // Unsubscribe - we are already dettached.
                            render();
                            scope.$applyAsync();
                        };

                        setTimeout(function() {editor.focus();}, 0);
                    };

                    /**
                     * Watches
                     */
                    csfUserSettings.UserSettingsPromise.then(function(value) {
                        scope.UserSettings = value;
                        scope.$watch('UserSettings.instance.editor', render, true);
                        scope.$watch('text', function(newV, oldV) {
                            if(scope.isEditing) {
                                return;
                            }

                            render();
                        });
                    });

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                        if(scope.isEditing) {
                            csfAceEditor.release();
                        }
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
