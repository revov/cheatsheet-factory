Meteor.methods({
    createNewUser: function(user) {
        var userId = Accounts.createUser({
            username: user.email,
            email: user.email,
            password: user.password,
            profile: {
                firstName: user.profile.firstName,
                lastName: user.profile.lastName,
                userSettings: {
                    editor : {
                        theme: 'ace/theme/tomorrow',
                        fontSize: 14
                    }
                }

            }
        });
        Roles.addUsersToRoles(userId, ['member']);

        return userId;
    },
    deleteUser: function(userId) {
        // First check the client's permissions:
        if( !CanI.edit.user() ) {
            throw new Meteor.Error('403', 'Forbidden. You do not have permissions to delete User.');
        }

        // Remove user from all their Roles
        Roles.setUserRoles( [userId], [] );

        // Delete the user
        Meteor.users.remove( {_id: userId} );
    }
});