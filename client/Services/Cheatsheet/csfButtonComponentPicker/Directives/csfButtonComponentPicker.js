angular.module('cheatsheet')
    .directive('csfButtonComponentPicker',
        function() {
            var possibleComponents = [
                {
                    name: 'Code Snippet',
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
                {
                    name: 'Newsletter',
                    // TODO: Move the samples out of here because they will tend to become more and bigger and will pollute the scope
                    value: {
                        type: 'container.newsletter',
                        meta: {
                            columns: {
                                1: 0,
                                2: 0
                            }
                        },
                        content: []
                    }
                }
            ];

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
                                scope.onAdded({chosenComponent: value});
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
