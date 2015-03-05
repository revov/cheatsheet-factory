Meteor.publish('user-roles', function () {
    if(Roles.userIsInRole(this.userId, 'admin')) {
        return Meteor.roles.find();
    } else {
        this.ready();
    }
});

Meteor.publish('all-users', function () {
    if(Roles.userIsInRole(this.userId, 'admin')) {
        return Meteor.users.find();
    } else {
        this.ready();
    }
})