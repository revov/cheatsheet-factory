angular.module('cheatsheet')
    .directive('csfCheatMarkdown',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatMarkdown/Templates/csfCheatMarkdown.ng.html',
                scope: {
                    component: '=',
                    canI: '='
                },
                link: function(scope, element, attrs) {
                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
