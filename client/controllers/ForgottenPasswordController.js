angular.module('cheatsheet')
    .controller('ForgottenPasswordController', [
        '$scope', 'csfNotification', '$meteor',
        function ($scope, csfNotification, $meteor) {
            var forgottenPassword = this;
            forgottenPassword.loading = false;

            forgottenPassword.formSettings = [
                {
                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type: 'email',
                                prompt: 'Please enter a valid email.'
                            }
                        ]
                    }
                },
                {
                    on: 'submit',
                    inline: 'true',
                    onSuccess: function() {
                        $scope.$apply(forgottenPassword.handle);
                    }
                }
            ];

            forgottenPassword.handle = function() {
                forgottenPassword.loading = true;
                $meteor.forgotPassword({email: forgottenPassword.email})
                    .then(
                        function() {
                            csfNotification.show('success', 'Password reset link has been sent to your email address.');
                        },
                        function(err) {
                            csfNotification.show('error', 'There was an error sending the email.', err);
                        }
                    )
                    .then(function() {
                        forgottenPassword.loading = false;
                    });
            };
        }
    ]);
