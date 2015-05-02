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

                Meteor.call('createNewUser', user, function(err, userId) {
                    if (err) {
                        deferred.reject(err);
                        return;
                    }

                    Meteor.loginWithPassword(user.email, user.password);
                    deferred.resolve(userId);
                });
                return deferred.promise;
            };

            this.deleteUser = function(userId) {
                var deferred = $q.defer();

                Meteor.call('deleteUser', userId, function(err) {
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
                    if ( !Meteor.loggingIn() ) {
                        currentUserDefer.resolve(Meteor.user());
                    }

                });

                // return the function to be assigned as Session.currentUserPromise
                return function() {
                    return currentUserDefer.promise;
                };

            })();
        }
    ]);
