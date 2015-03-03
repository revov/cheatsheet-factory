angular.module('cheatsheet')
    .directive('csfCheatsheet', [
        'csfUserSettings', '$compile',
        function(csfUserSettings, $compile) {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatsheet/Templates/csfCheatsheet.ng.html',
                scope: {
                    component: '='
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
    ]);
