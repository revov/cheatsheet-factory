angular.module('cheatsheet')
    .controller('ResetPasswordController', [
        '$scope', '$state', '$stateParams', 'csfNotification', '$meteor',
        function ($scope, $state, $stateParams, csfNotification, $meteor) {
            var resetPassword = this;
            resetPassword.token = $stateParams.id;

            resetPassword.formSettings = {
                fields: {
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'length[6]',
                                prompt: 'Your password should be at least 6 characters long.'
                            }
                        ]
                    },
                    confirmPassword: {
                        identifier: 'confirm-password',
                        rules: [
                            {
                                type: 'match[password]',
                                prompt: 'Your passwords do not match.'
                            }
                        ]
                    }
                },
				on: 'submit',
				inline: 'true',
				onSuccess: function() {
					$scope.$apply(resetPassword.handle);
				}
			};

            resetPassword.handle = function() {
                $meteor.resetPassword(resetPassword.token, resetPassword.password)
                    .then(
                        function() {
                            csfNotification.show('success', 'Password changed successfully.');
                            $state.go('cheatsheet');
                        },
                        function(err) {
                            csfNotification.show('error', 'There was an error resetting your password', err);
                        }
                    );
            };
        }
    ]);
