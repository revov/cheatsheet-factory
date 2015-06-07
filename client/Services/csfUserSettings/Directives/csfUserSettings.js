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
                        scope.profile = angular.copy(Meteor.user().profile);

                        element
                            .modal(
                                {
                                    duration: 150,
                                    onApprove: function() {
                                        Meteor.users.update(
                                            {_id: Meteor.userId()},
                                            {
                                                $set: {
                                                    'profile': scope.profile
                                                }
                                            },
                                            function(err){
                                                if(err) {
                                                    csfNotification.show('error', 'There was an error saving User Settings:', error);
                                                } else {
                                                    csfNotification.show('success', 'Success!', 'User Settings were successfully saved.');
                                                }
                                                scope.$apply();
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
                }
            };
        }
    ]);
