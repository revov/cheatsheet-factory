if(Meteor.isServer) {
    Meteor.publish('all-users', function () {
        if (Roles.userIsInRole(this.userId, 'admin')) {
            return Meteor.users.find();
        } else {
            this.ready();
        }
    });

    Meteor.publish('user-names', function (userIds) {
        if (Roles.userIsInRole(this.userId, 'member')) {
            return Meteor.users.find({_id: {$in: userIds}}, {fields: {'profile.firstName': 1, 'profile.lastName': 1}});
        } else {
            this.ready();
        }
    });
}