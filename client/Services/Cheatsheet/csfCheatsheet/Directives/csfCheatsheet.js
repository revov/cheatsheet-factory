angular.module('cheatsheet')
    .directive('csfCheatsheet', [
        'csfUserSettings', '$compile',
        function(csfUserSettings, $compile) {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatsheet/Templates/csfCheatsheet.ng.html',
                scope: {
                    cheatsheet: '='
                },
                link: function(scope, element, attrs) {
                    if(cheatsheet.type !== 'cheatsheet') {
                        throw 'Invalid Object. Expected "cheatsheet", got "' + cheatsheet.type + '".';
                    }



                    scope.$on('$destroy', function() {

                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
