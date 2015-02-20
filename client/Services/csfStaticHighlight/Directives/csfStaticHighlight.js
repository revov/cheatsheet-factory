angular.module('cheatsheet')
    .directive('csfStaticHighlight', [
        'csfUserSettings', 'csfStaticHighlight',
        function(csfUserSettings, csfStaticHighlight) {
            return {
                restrict : 'E',
                replace: true,
                template: '<div></div>',
                scope: {
                    textToHighlight: '@',
                    mode: '@'
                },
                link: function(scope, element, attrs) {
                    scope.render = function() {
                        element.html( csfStaticHighlight.render(scope.textToHighlight, scope.mode, scope.UserSettings) );
                    };
                    csfUserSettings.UserSettingsPromise.then(
                        function(value) {
                            scope.UserSettings = value;
                            scope.$watchGroup(
                                [
                                    'UserSettings.editorTheme',
                                    'UserSettings.editorTheme'
                                ],
                                function(newValues, oldValues) {
                                    scope.render()
                                }
                            );
                        }
                    );


                }
            };
        }
    ]);
