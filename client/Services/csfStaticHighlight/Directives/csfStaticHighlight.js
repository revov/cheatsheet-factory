angular.module('cheatsheet')
    .directive('csfStaticHighlight', [
        'csfUserSettings', 'csfStaticHighlight',
        function(csfUserSettings, csfStaticHighlight) {
            return {
                restrict : 'E',
                scope: {
                    textToHighlight: '@',
                    mode: '@'
                },
                link: function(scope, element, attrs) {
                    var rendered = false;

                    // Updates the styles and renders the element
                    function render() {
                        element.html( csfStaticHighlight.render(scope.textToHighlight, scope.mode, scope.UserSettings.instance.editor) );
                        rendered = true;
                    }

                    // Updates the styles only
                    function updateStyles () {
                        csfStaticHighlight.updateStyles(scope.UserSettings.instance.editor, element);
                    }

                    csfUserSettings.UserSettingsPromise.then(function(value) {
                        scope.UserSettings = value;
                        scope.$watch('UserSettings.instance.editor', rendered ? updateStyles : render, true);
                        scope.$watchGroup( ['textToHighlight', 'mode'], render);
                    });

                    scope.$on('$destroy', function() {
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
