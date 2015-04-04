angular.module('cheatsheet')
    .directive('csfButtonCheatPicker',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfButtonCheatPicker/Templates/csfButtonCheatPicker.ng.html',
                scope: {
                    onAdded: '&'
                },
                link: function(scope, element, attrs) {
                    scope.possibleCheats = [
                        {
                            name: 'Code Snippet',
                            value: 'cheat.codeSnippet'
                        }
                    ];

                    var dropdownElement = element.find('.ui.dropdown');

                    dropdownElement.dropdown({
                        action: function(text, value) {
                            scope.$apply(function() {
                                scope.onAdded({type: value});
                            });
                            dropdownElement.dropdown('hide');
                            dropdownElement.dropdown('set text', 'Add cheat');
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
