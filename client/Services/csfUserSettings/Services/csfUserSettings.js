angular.module('cheatsheet')
    .service('csfUserSettings', [
        '$meteorSubscribe', '$meteorObject', '$q',
        function($meteorSubscribe, $meteorObject, $q) {
            var me = this;
            var deferred;

            subscription = Meteor.subscribe('user-settings');
            Tracker.autorun(function() {
                if (!deferred || Meteor.loggingIn() ) {
                    deferred = $q.defer();
                    me.UserSettingsPromise = deferred.promise;
                }
                if( Meteor.userId() && subscription.ready() ) {
                    var userSettingsId = UserSettings.findOne({userId: Meteor.userId()}, {fields: {_id:true}})._id;
                    deferred.resolve( $meteorObject(UserSettings, userSettingsId, false) ); //TODO: clean $meteorObject once we have an API for that
                }
            });
        }
    ]);
