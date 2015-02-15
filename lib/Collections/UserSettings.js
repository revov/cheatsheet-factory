UserSettings = new Mongo.Collection("user-settings");
UserSettings.attachSchema(Schemas.userSettings);

if(Meteor.isServer) {
    Meteor.publish('user-settings', function() {
        //console.log(this);
        return UserSettings.find({ userId: this.userId });
    });
}
