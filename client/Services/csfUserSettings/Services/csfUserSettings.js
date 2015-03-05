angular.module('cheatsheet')
    .service('csfUserSettings', [
        '$meteorSubscribe', '$meteorObject', '$q', '$timeout', '$rootScope',
        function($meteorSubscribe, $meteorObject, $q, $timeout, $rootScope) {
            var me = this;
            var deferred;
            var userSettings = {
                instance: null
            };

            subscription = Meteor.subscribe('user-settings');
            Tracker.autorun(function() {
                if (!deferred && Meteor.loggingIn() ) {
                    deferred = $q.defer();
                    me.UserSettingsPromise = deferred.promise;
                }
                if( Meteor.userId() && subscription.ready() ) {
                    var userSettingsId = UserSettings.findOne({userId: Meteor.userId()}, {fields: {_id:true}})._id;
                    // Wrap the following inside $timeout since it contains reactive sources which should not trigger this autorun
                    $timeout(function() {
                        if(userSettings.instance) {
                            userSettings.instance.stop();
                        }
                        $rootScope.$apply(function() {
                            userSettings.instance = $meteorObject(UserSettings, userSettingsId, false);
                            deferred.resolve( userSettings );
                        });
                    });
                }
            });
        }
    ]);
