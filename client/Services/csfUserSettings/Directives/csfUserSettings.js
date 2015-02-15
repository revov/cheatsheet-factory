angular.module('cheatsheet')
    .directive('csfUserSettings', [
        'csfUserSettings',
        function(csfUserSettings) {
            function initSemantic(scope, element) {
                // Themes
                scope.themelist = ace.require("ace/ext/themelist").themesByName;
            }

            return {
                restrict : 'E',
                templateUrl : 'client/Services/csfUserSettings/Templates/csfUserSettings.tpl',
                replace: true,
                scope: {},
                link: function(scope, element, attrs) {
                    scope.$on("openUserSettings", function (event, params) {
                        element.modal({duration: 150}).modal('show');
                    });

                    scope.activeItem = 'editorTheme';
                    scope.setActiveItem = function(activeItem) {
                        scope.activeItem = activeItem;
                    };

                    element.on('$destroy', function() {
                        // TODO: maybe clean up something
                    });

                    initSemantic(scope, element);

                    scope.UserSettings = {};
                    csfUserSettings.UserSettingsPromise
                        .then(function(value) {
                            scope.UserSettings = value;
                        });

                    scope.debug = function() {
                        scope.UserSettings.editorTheme = 'ace/theme/monokai';
                    };
                }
            };
        }
    ]);
