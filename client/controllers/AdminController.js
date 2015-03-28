angular.module('cheatsheet').controller('AdminController', [
    '$state', '$meteor', '$scope',
    function($state, $meteor, $scope) {
        var admin = this;
        var usersPromise = $meteor.subscribe('all-users');
        var rolesPromise = $meteor.subscribe('user-roles');
        var usersSubscriptionHandle;
        var rolesSubscriptionHandle;

        usersPromise.then(function(value) {
            usersSubscriptionHandle = value;
            admin.users = $meteor.collection(Meteor.users, false);
        });

        rolesPromise.then(function(value) {
            rolesSubscriptionHandle = value;
            admin.roles = $meteor.collection(Meteor.roles, false);
        });

        admin.addUserToRole = function(user, event) {
            var input = event.currentTarget.previousElementSibling;
            Roles.addUsersToRoles(user._id, [input.value]);
            input.value = '';
        };

        admin.removeUserFromRole = function(user, role) {
            if( user._id === $scope.currentUser._id && role==='admin') {
                $('#revoke-admin-rights').modal('show');
            } else {
                Roles.removeUsersFromRoles(user._id, [role]);
            }
        };

        /***************
         * Confirmation dialog
         ***************/
        $('#revoke-admin-rights').modal({
            closable: false,
            detachable: false, // memory leak otherwise
            onApprove: function() {
                Roles.removeUsersFromRoles($scope.currentUser._id, ['admin']);
                $state.go('home');
            }
        });

        $scope.$on('$destroy', function() {
            admin.users.stop();
            admin.roles.stop();
            usersSubscriptionHandle.stop();
            rolesSubscriptionHandle.stop();
            $('#revoke-admin-rights').modal('destroy'); // This is very leaky, so we need a workaround:
                $scope = null;
                $state = null;
        });

    }
]);