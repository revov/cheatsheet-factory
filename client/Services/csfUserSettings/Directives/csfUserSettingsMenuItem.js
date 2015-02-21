angular.module('cheatsheet')
    .directive('csfUserSettingsMenuItem', [
        '$rootScope',
        function($rootScope) {
            return {
                restrict : 'E',
                templateUrl : 'client/Services/csfUserSettings/Templates/csfUserSettingsMenuItem.ng.html',
                replace: true,
                scope: {},
                link: function(scope, element, attrs) {
                    scope.openSettingsModal = function() {
                        $rootScope.$broadcast("openUserSettings", {});
                    }
                }
            };
        }
    ]);