angular.module('cheatsheet')
    .service('csfUserSettings', [
        '$meteorSubscribe', '$meteorObject', '$q',
        function($meteorSubscribe, $meteorObject, $q) {
            var deferred = $q.defer();

            subscription = $meteorSubscribe.subscribe('user-settings');
            subscription.then(
                function() {
                    var userSettingsId = UserSettings.findOne({userId: Meteor.userId()}, {fields: {_id:true}})._id;
                    deferred.resolve( $meteorObject(UserSettings, userSettingsId, false) );
                },
                function(error) {
                    deferred.reject(error);
                }
            );


            this.UserSettingsPromise = deferred.promise;
        }
    ]);
