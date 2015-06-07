Migrations.add({
    version: 2,
    name: 'Deprecate the csfUserSettings and store the user settings in their profile',
    up: function() {
        if(!UserSettings) {
            UserSettings = new Mongo.Collection("user-settings");
        }

        UserSettings.find().forEach(function(doc) {
            var userId = doc.userId;

            delete doc._id;
            delete doc.userId;

            Meteor.users.update(
                {_id: userId},
                {
                    $set: {'profile.userSettings': doc}
                }
            );
        });
    },
    down: function() {
        if(!UserSettings) {
            UserSettings = new Mongo.Collection("user-settings");
        }

        Meteor.users.find().forEach(function(doc) {
            var settings = doc.profile.userSettings;
            settings.userId = doc._id;

            UserSettings.upsert(
                {userId: settings.userId},
                {$set: settings}
            );
        });
    }
});