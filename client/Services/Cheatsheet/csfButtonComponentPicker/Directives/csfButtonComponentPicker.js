angular.module('cheatsheet')
    .directive('csfButtonComponentPicker',
        function() {
            var possibleComponents = {
                'cheat.codeSnippet': {
                    name: 'Code Snippet',
                    icon: 'file outline',
                    // TODO: Move the samples out of here because they will tend to become more and bigger and will pollute the scope
                    value: {
                        type: 'cheat.codeSnippet',
                        meta: {
                            code: '',
                            lang: 'javascript',
                            header: 'New Cheat'
                        }
                    }
                },
                'cheat.markdown': {
                    name: 'Markdown',
                    icon: 'file outline',
                    // TODO: Move the samples out of here because they will tend to become more and bigger and will pollute the scope
                    value: {
                        type: 'cheat.markdown',
                        meta: {
							markdown: ''
                        }
                    }
                },
                'container.newsletter': {
                    name: 'Newsletter',
                    icon: 'list',
                    // TODO: Move the samples out of here because they will tend to become more and bigger and will pollute the scope
                    value: {
                        type: 'container.newsletter',
                        meta: {
                            columnsSize: [0, 0]
                        },
                        content: []
                    }
                },
                'container.tab': {
                    name: 'Tab',
                    icon: 'list',
                    // TODO: Move the samples out of here because they will tend to become more and bigger and will pollute the scope
                    value: {
                        type: 'container.tab',
                        meta: {
                            tabNames: []
                        },
                        content: []
                    }
                }
            };

            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfButtonComponentPicker/Templates/csfButtonComponentPicker.ng.html',
                scope: {
                    onAdded: '&'
                },
                link: function(scope, element, attrs) {
                    scope.possibleComponents = possibleComponents;

                    var dropdownElement = element.find('.ui.dropdown');

                    dropdownElement.dropdown({
                        action: function(text, value) {
                            scope.$apply(function() {
                                scope.onAdded({chosenComponent: angular.copy(scope.possibleComponents[value].value)});
                            });
                            dropdownElement.dropdown('hide');
                            dropdownElement.dropdown('set text', 'Add component');
                        }
                    });

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                        dropdownElement.dropdown('destroy');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
