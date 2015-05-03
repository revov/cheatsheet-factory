angular.module('cheatsheet').controller('AdminController', [
    '$state', '$scope', 'Session', 'csfNotification', 'csfMeteor',
    function($state, $scope, Session, csfNotification, csfMeteor) {
        var admin = this;
        csfMeteor.subscribe( $scope, 'all-users');
        csfMeteor.subscribe( $scope, 'user-roles');

        admin.users = csfMeteor.collection($scope, Meteor.users, false);
        admin.roles = csfMeteor.collection($scope, Meteor.roles, false);

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

        admin.deleteUser = function(user) {
            Session.deleteUser(user._id)
                .then(
                    function() {
                        csfNotification.show('success', 'Success', 'You have successfully deleted user.');
                    },
                    function(err) {
                        csfNotification.show('error', 'Error deleting user:', err.reason);
                    }
                );
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

        /***************
         * Configuration
         ***************/
        csfMeteor.subscribe( $scope, 'configuration');
        admin.configuration = csfMeteor.object($scope, Configuration, {}, false);
        admin.setMailUrl = function() {
            admin.configuration.save( {mail: admin.configuration.mail} )
                .then(
                    function() {
                        csfNotification.show('warning', 'You have successfully set MAIL_URL.', 'Please restart Meteor Server to apply changes.');
                    },
                    function(err) {
                        csfNotification.show('error', 'Error setting MAIL_URL:', err.message);
                    }
                );
        };

        /***************
         * Cleanup
         ***************/
        $scope.$on('$destroy', function() {
            $('#revoke-admin-rights').modal('destroy'); // This is very leaky, so we need a workaround:
                $scope = null;
                $state = null;
        });

    }
]);