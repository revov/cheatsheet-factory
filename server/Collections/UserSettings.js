UserSettings.allow({
    update: function(userId, doc, fieldNames, modifier) {
        return userId && (doc.userId === userId);
    }
});

Meteor.publish('user-settings', function() {
    return UserSettings.find({ userId: this.userId });
});