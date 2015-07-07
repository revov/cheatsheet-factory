angular.module('cheatsheet')
    .controller('RegisterController', [
        '$scope', 'Session', '$state', 'csfNotification',
        function ($scope, Session, $state, csfNotification) {
            var register = this;

            register.createUser = function () {
                if (!register.user) {
                    return;
                }

                register.state = 'loading';

                Session.createUser(register.user)
                    .then(
                        function () {
                            register.state = 'success';
                            csfNotification.show(register.state, 'Welcome to the Cheatsheet Factory!', 'You have successfully registered!');
                            $state.go('cheatsheet');
                        },
                        function (err) {
                            register.errorMsg = err.reason;
                            register.user.email = '';
                            register.user.password = '';
                            register.user.confirmPassword = '';
                            register.state = 'error';
                        }
                    );
            };

			register.formSettings = {
				fields: {
					email: {
						identifier: 'email',
						rules: [
							{
								type: 'email',
								prompt: 'Please enter a valid email.'
							}
						]
					},
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
					},
					firstName: {
						identifier: 'first-name',
						rules: [
							{
								type: 'length[2]',
								prompt: 'Your first name should be at least 2 characters long'
							}
						]
					},
					lastName: {
						identifier: 'last-name',
						rules: [
							{
								type: 'length[2]',
								prompt: 'Your last name should be at least 2 characters long'
							}
						]
					}
				},
				on: 'blur',
				inline: 'true',
				onSuccess: function () {
					$scope.$apply(register.createUser);
				}
			};

            $scope.$on('$destroy', function() {
                $('#register-form').form('destroy');
            });

        }
    ]);