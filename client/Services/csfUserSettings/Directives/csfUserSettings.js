angular.module('cheatsheet')
    .directive('csfUserSettings', [
        'csfUserSettings', 'csfNotification',
        function(csfUserSettings, csfNotification) {
            function initSemantic(scope, element) {
                // Themes
                scope.themelist = ace.require("ace/ext/themelist").themesByName;
            }

            return {
                restrict : 'E',
                templateUrl : 'client/Services/csfUserSettings/Templates/csfUserSettings.ng.html',
                replace: true,
                scope: {},
                link: function(scope, element, attrs) {
                    scope.$on("openUserSettings", function (event, params) {
                        element
                            .modal(
                                {
                                    duration: 150,
                                    onDeny: function() {
                                        scope.UserSettings.reset();
                                        scope.$apply();
                                    },
                                    onApprove: function() {
                                        scope.UserSettings.save().then(
                                            function(){
                                                csfNotification.show('success', 'Success!', 'User Settings were successfully saved.');
                                            },
                                            function(error) {
                                                csfNotification.show('error', 'There was an error saving User Settings:', error);
                                            }
                                        );
                                    }
                                }
                            )
                            .modal('show');
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
                }
            };
        }
    ]);
