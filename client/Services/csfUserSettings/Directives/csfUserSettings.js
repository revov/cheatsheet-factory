angular.module('cheatsheet')
    .directive('csfUserSettings', [
        '$timeout',
        function($timeout) {
            function initSemantic(scope, element) {
                // Themes
                setTimeout(function() {
                    scope.themelist = ace.require("ace/ext/themelist").themesByName;
                    element.find('.ui.dropdown').dropdown();
                }, 1000);


            }

            return {
                restrict : 'E',
                templateUrl : 'client/Services/csfUserSettings/Templates/csfUserSettings.tpl',
                replace: true,
                scope: {},
                link: function(scope, element, attrs) {
                    scope.$on("openUserSettings", function (event, params) {
                        element.modal('show');
                    });

                    scope.activeItem = 'editorTheme';
                    scope.setActiveItem = function(activeItem) {
                        scope.activeItem = activeItem;
                    };

                    element.on('$destroy', function() {
                        // TODO: User Settings onDestroy
                    });

                    initSemantic(scope, element);

                    scope.UserSettings = {
                        editor: {
                            theme: 'dawn'
                        }
                    };
                    scope.$watch('UserSettings', function(oldV, newV) {
                        console.log(oldV);
                        console.log(newV);
                    });
                }
            };
        }
    ]);
