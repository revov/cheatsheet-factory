angular.module('cheatsheet')
    .controller('LoginController', [
        '$scope', 'Session', '$state', 'csfNotification',
        function ($scope, Session, $state, csfNotification) {
            var me = this;

            this.login = function login() {
                me.state = 'loading';

                Session.login(me.user)
                    .then(
                    function () {
                        me.state = 'success';
                        csfNotification.show(me.state, 'Welcome to the Cheatsheet Factory!', 'You have successfully logged in!');
                        $state.go('cheatsheet');
                    },
                    function (err) {
                        me.user.password = '';
                        me.errorMsg = err.reason;
                        me.state = 'error';
                    }
                );
            };

            this.createUser = function () {
                if (!me.user) {
                    return;
                }

                me.state = 'loading';

                Session.createUser({
                    username: String(me.user.email).split('@')[0],
                    email: me.user.email,
                    password: me.user.password
                }).then(
                    function () {
                        me.state = 'success';
                        csfNotification.show(me.state, 'Welcome to the Cheatsheet Factory!', 'You have successfully registered!');
                    },
                    function (err) {
                        me.errorMsg = err.reason;
                        me.user.email = '';
                        me.user.password = '';
                        me.state = 'error';
                    });
            };

            $('.ui.form').form({
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
                    }
                },
                {
                    on: 'blur',
                    inline: 'true',
                    onSuccess: function() {
                        $scope.$apply(me.login);
                    }
                });

        }
    ]);