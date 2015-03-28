if(Meteor.isServer) {
    Meteor.users.allow({
        update: function(userId, doc, fieldNames, modifier) {
            return Roles.userIsInRole(userId, 'admin');
        }
    });

    Meteor.roles.allow({
        insert: function(userId, doc) {
            return Roles.userIsInRole(userId, 'admin');
        },
        update: function(userId, doc, fieldNames, modifier) {
            return Roles.userIsInRole(userId, 'admin');
        },
        remove: function(userId, doc) {
            return Roles.userIsInRole(userId, 'admin');
        }
    });

    Meteor.publish('user-roles', function () {
        if( this.userId ) {
            return Meteor.roles.find();
        } else {
            this.ready();
        }
    });
}