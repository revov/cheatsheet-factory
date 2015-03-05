Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }

    Roles.addUsersToRoles(user._id, ['member']);

    return user;
});