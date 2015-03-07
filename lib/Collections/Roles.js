if(Meteor.isServer) {
    Meteor.users.allow({
        update: function(userId, doc, fieldNames, modifier) {
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