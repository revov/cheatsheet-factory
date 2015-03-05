Meteor.users.allow({
    update: function(userId, doc, fieldNames, modifier) {
        return Roles.userIsInRole(userId, 'admin');
    }
});