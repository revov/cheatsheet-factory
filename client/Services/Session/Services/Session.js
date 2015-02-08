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

            /**
             * Returns a promise that is resolved with the currentUser - object when we have a user or null when we don't
             * @returns {Promise}
             */
            this.currentUserPromise = (function() {
                var currentUserDefer;

                Meteor.autorun(function() {
                    // if there is no currentUserDefer (on first autorun)
                    // or it is already resolved, but the Meteor.user() is changing
                    if (!currentUserDefer || Meteor.loggingIn() ) {
                        currentUserDefer = $q.defer();
                    }

                    var currentUser = Meteor.user();

                    if ( !Meteor.loggingIn() ) {
                        currentUserDefer.resolve(currentUser);
                    }

                });

                // return the function to be assigned as Session.currentUserPromise
                return function() {
                    return currentUserDefer.promise;
                };

            })();
        }
    ]);
