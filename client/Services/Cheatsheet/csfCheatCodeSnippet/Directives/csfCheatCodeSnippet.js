angular.module('cheatsheet')
    .directive('csfCheatCodeSnippet',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatCodeSnippet/Templates/csfCheatCodeSnippet.ng.html',
                scope: {
                    component: '=',
                    canI: '='
                },
                link: function(scope, element, attrs) {
                    scope.$on('$destroy', function() {

                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
