Meteor.methods({
    createNewUser: function(user) {
        var userId = Accounts.createUser({
            username: user.email,
            email: user.email,
            password: user.password,
            profile: {
                firstName: user.profile.firstName,
                lastName: user.profile.lastName
            }
        });
        Roles.addUsersToRoles(userId, ['member']);
        UserSettings.insert({ userId: userId });

        return userId;
    }
});