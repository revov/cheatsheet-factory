angular.module('cheatsheet')
    .directive('csfUserSettings', [
        '$meteor', 'csfNotification',
        function($meteor, csfNotification) {
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
                        scope.UserSettings = angular.copy(Meteor.user().profile.userSettings);

                        element
                            .modal(
                                {
                                    duration: 150,
                                    onApprove: function() {
                                        Meteor.users.update(
                                            {_id: Meteor.userId()},
                                            {
                                                $set: {
                                                    'profile.userSettings': scope.UserSettings
                                                }
                                            },
                                            function(err){
                                                if(err) {
                                                    csfNotification.show('error', 'There was an error saving User Settings:', error);
                                                } else {
                                                    csfNotification.show('success', 'Success!', 'User Settings were successfully saved.');
                                                }
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
                }
            };
        }
    ]);
