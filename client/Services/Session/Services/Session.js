angular.module('cheatsheet')
    .service('Session', [
        '$q',
        function($q) {
            this.login = function (user) {
                var deferred = $q.defer();
                Meteor.loginWithPassword(user.email, user.password, function (err) {
                    if (err) {
                        deferred.reject(err);
                        return;
                    }

                    deferred.resolve();
                });
                return deferred.promise;
            };

            this.logout = function () {
                Meteor.logout();
            };

            this.createUser = function (user) {
                var deferred = $q.defer();
                Accounts.createUser({
                    username: user.email,
                    email: user.email,
                    password: user.password,
                    profile: user.profile
                }, function (err) {
                    if (err) {
                        deferred.reject(err);
                        return;
                    }

                    deferred.resolve();
                });
                return deferred.promise;
            };
        }
    ]);
