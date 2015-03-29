angular.module('cheatsheet')
    .directive('csfEditableMarkdown', [
        'csfMarkdown', 'csfUserSettings',
        function(csfMarkdown, csfUserSettings) {
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
                        if(scope.canEdit) {
                            scope.isEditing = true;
                            setTimeout(function() {
                                element.find('textarea').focus();
                            }, 0);
                        }
                    };

                    scope.disableEditing = function() {
                        scope.isEditing = false;
                        render();
                    };

                    element.find('textarea').on('blur', function() {
                        scope.$apply(scope.disableEditing);
                    });

                    /**
                     * Watches
                     */
                    scope.$watch('canEdit', function(newV, oldV) {
                        if(newV) {
                            element.addClass('csf-editable');
                        } else {
                            element.removeClass('csf-editable');
                        }
                    });
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
                        element.find('textarea').off('blur');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
