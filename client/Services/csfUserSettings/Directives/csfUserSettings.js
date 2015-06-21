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
                        scope.userId = Meteor.userId();

                        element
                            .modal(
                                {
                                    duration: 150,
                                    onApprove: function() {
                                        var profilePic = element.find('#profilePic')[0].files[0];
                                        if(profilePic) {
                                            var file = new FS.File( profilePic );
                                            file.userId = scope.userId;
                                            Avatars.insert(file, function(err) {
                                                if(err) {
                                                    csfNotification.show('error', 'There was an error uploading your Profile Picture:', err.reason);
                                                } else {
                                                    csfNotification.show('success', 'Profile Picture successfully uploaded.');
                                                }
                                            });
                                        }

                                        Meteor.users.update(
                                            {_id: Meteor.userId()},
                                            {
                                                $set: {
                                                    'profile': scope.profile
                                                }
                                            },
                                            function(err){
                                                if(err) {
                                                    csfNotification.show('error', 'There was an error saving User Settings:', err.reason);
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
