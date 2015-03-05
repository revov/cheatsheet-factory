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
                        element.html( csfStaticHighlight.render(scope.textToHighlight, scope.mode, scope.UserSettings.instance.editor) );
                    };
                    csfUserSettings.UserSettingsPromise.then(
                        function(value) {
                            scope.UserSettings = value;
                            scope.$watch(
                                'UserSettings.instance.editor',
                                function(newValues, oldValues) {
                                    scope.render();
                                },
                                true
                            );
                        }
                    );

                    scope.$on('$destroy', function() {
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
