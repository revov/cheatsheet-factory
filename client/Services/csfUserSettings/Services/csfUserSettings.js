angular.module('cheatsheet')
    .service('csfUserSettings', [
        '$meteorSubscribe', '$meteorObject', '$q', '$timeout',
        function($meteorSubscribe, $meteorObject, $q, $timeout) {
            var me = this;
            var deferred;
            var currentUserSettings;

            subscription = Meteor.subscribe('user-settings');
            Tracker.autorun(function() {
                if (!deferred || Meteor.loggingIn() ) {
                    deferred = $q.defer();
                    me.UserSettingsPromise = deferred.promise;
                }
                if( Meteor.userId() && subscription.ready() ) {
                    var userSettingsId = UserSettings.findOne({userId: Meteor.userId()}, {fields: {_id:true}})._id;
                    // Wrap the following inside $timeout since it contains reactive sources which should not trigger this autorun
                    $timeout(function() {
                        if(currentUserSettings) {
                            currentUserSettings.stop();
                        }
                        currentUserSettings = $meteorObject(UserSettings, userSettingsId, false);
                        deferred.resolve( $meteorObject(UserSettings, userSettingsId, false) );
                    });
                }
            });
        }
    ]);
