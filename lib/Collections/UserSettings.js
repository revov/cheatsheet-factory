UserSettings = new Mongo.Collection("user-settings");
UserSettings.attachSchema(Schemas.userSettings);

if(Meteor.isServer) {
    UserSettings.allow({
        update: function(userId, doc, fieldNames, modifier) {
            return userId && (doc.userId === userId);
        }
    });

    Meteor.publish('user-settings', function() {
        return UserSettings.find({ userId: this.userId });
    });
}
