angular.module('cheatsheet')
    .directive('csfStaticHighlight', [
        'csfStaticHighlight', '$meteor',
        function(csfStaticHighlight, $meteor) {
            return {
                restrict : 'E',
                scope: {
                    textToHighlight: '@',
                    mode: '@',
                    editorSettings: '=' // If not provided the user settings will be used
                },
                link: function(scope, element, attrs) {
                    var rendered = false;

                    /**
                     * Returns the provided editorSettings or if not provided the ones from the user's preferences
                     * @returns {UserSettings.editor}
                     */
                    function getEditorSettings() {
                        return scope.editorSettings ? scope.editorSettings : scope.UserSettings.editor;
                    }

                    /**
                     * Updates the styles and renders the element
                     */
                    function render() {
                        element.html( csfStaticHighlight.render(scope.textToHighlight, scope.mode, getEditorSettings()) );
                        rendered = true;
                    }

                    /**
                     * Updates the styles only
                     */
                    function updateStyles () {
                        csfStaticHighlight.updateStyles(getEditorSettings(), element);
                    }

                    /**
                     * Watchers
                     */
                    $meteor.requireUser().then(function(user) {
                        scope.$watchGroup( ['textToHighlight', 'mode'], render);
                    });

                    scope.$watch(
                        'editorSettings',
                        function(newValue, oldValue) {
                            if(newValue) {
                                rendered ? updateStyles() : render();
                            }
                        },
                        true
                    );

                    $meteor.autorun(scope, function() {
                        var currentUser = Meteor.user();
                        if(!currentUser) {return;}
                        scope.UserSettings = currentUser.profile.userSettings;

                        rendered ? updateStyles() : render();
                    });

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
