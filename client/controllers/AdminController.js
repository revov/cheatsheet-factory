angular.module('cheatsheet').controller('AdminController', [
    'Session', '$state', '$meteor', '$scope',
    function(Session, $state, $meteor, $scope) {
        var admin = this;
        var usersPromise = $meteor.subscribe('all-users');
        var rolesPromise = $meteor.subscribe('user-roles');
        var usersSubscriptionHandle;
        var rolesSubscriptionHandle;

        usersPromise.then(function(value) {
            usersSubscriptionHandle = value;
            admin.users = $meteor.collection(function() {
                return Meteor.users.find(); //This is a hack, since Meteor.users doesn't look like a Mongo.Collection to $meteorCollection
            }, false);
        });

        rolesPromise.then(function(value) {
            rolesSubscriptionHandle = value;
            admin.roles = $meteor.collection(Meteor.roles, false);
        });

        $scope.$on('$destroy', function() {
            admin.users.stop();
            admin.roles.stop();
            usersSubscriptionHandle.stop();
            rolesSubscriptionHandle.stop();
        });

    }
]);