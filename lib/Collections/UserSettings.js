UserSettings = new Mongo.Collection("user-settings");
UserSettings.attachSchema(Schemas.userSettings);

if(Meteor.isServer) {
    UserSettings.allow({
        update: function(userId, doc, fieldNames, modifier) {
            return userId && (doc.userId === userId);
        }
    });

    Meteor.publish('user-settings', function() {
        if( this.userId && !UserSettings.findOne({ userId: this.userId }) ) {
            UserSettings.insert({ userId: this.userId });
        };
        return UserSettings.find({ userId: this.userId });
    });
}
