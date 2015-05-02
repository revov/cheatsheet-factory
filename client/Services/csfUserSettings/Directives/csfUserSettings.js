angular.module('cheatsheet')
    .directive('csfUserSettings', [
        'csfUserSettings', 'csfNotification',
        function(csfUserSettings, csfNotification) {
            function init(scope, element) {
                // Themes
                scope.themelist = ace.require("ace/ext/themelist").themesByName;
                scope.sample = 'function foo(items) {\n' +
                                '   var x = "All this is syntax highlighted";\n' +
                                '   return x;\n' +
                                '}\n';
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
                                        scope.UserSettings.instance.reset();
                                        scope.$apply();
                                    },
                                    onApprove: function() {
                                        scope.UserSettings.instance.save().then(
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

                    element.on('$destroy', function() {
                        // TODO: maybe clean up something
                    });

                    init(scope, element);

                    scope.UserSettings = {};
                    csfUserSettings.UserSettingsPromise
                        .then(function(value) {
                            scope.UserSettings = value;
                        });
                }
            };
        }
    ]);
