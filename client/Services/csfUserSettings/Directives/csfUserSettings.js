angular.module('cheatsheet')
    .directive('csfUserSettings', [
        '$timeout',
        function($timeout) {
            return {
                restrict : 'E',
                templateUrl : 'client/Services/csfUserSettings/Templates/csfUserSettings.tpl',
                replace: true,
                scope: {},
                link: function(scope, element, attrs) {
                    scope.$on("openUserSettings", function (event, params) {
                        element;scope;attrs;
                        element.modal('show');
                    });

                    scope.activeItem = 'editorTheme';

                    scope.setActiveItem = function(activeItem) {
                        scope.activeItem = activeItem;
                    };
                }
            };
        }
    ]);