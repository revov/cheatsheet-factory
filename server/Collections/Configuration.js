Configuration.allow({
    update: function(userId, doc, fieldNames, modifier) {
        return CanI.edit.configuration();
    }
});

Meteor.publish('configuration', function() {
    if( !Roles.userIsInRole(this.userId, 'admin') ) {
        this.ready();
    }

    return Configuration.find({}, {fields: {'mail.password': 0}});
});