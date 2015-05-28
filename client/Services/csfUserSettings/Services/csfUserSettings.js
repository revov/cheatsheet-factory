angular.module('cheatsheet')
    .service('csfUserSettings', [
        '$meteorSubscribe', '$meteorObject', '$q', '$timeout', '$rootScope',
        function($meteorSubscribe, $meteorObject, $q, $timeout, $rootScope) {
            var me = this;
            var deferred = $q.defer();
            var userSettings = {
                instance: null
            };

            me.UserSettingsPromise = deferred.promise;

            subscription = Meteor.subscribe('user-settings');
            Tracker.autorun(function() {
                if( Meteor.userId() && subscription.ready() ) {
                    // Wrap the following inside $timeout since it contains reactive sources which should not trigger this autorun
                    $timeout(function() {
                        if(userSettings.instance) {
                            userSettings.instance.stop();
                        }
                        $rootScope.$apply(function() {
                            userSettings.instance = $meteorObject(UserSettings, {userId: Meteor.userId()}, false);
                            deferred.resolve( userSettings );
                        });
                    });
                }
            });
        }
    ]);
