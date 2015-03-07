RestrictionsTo = {};

RestrictionsTo.view = {};
RestrictionsTo.view = {
    cheatsheet: function (userId) {
        var rolesForUser = Roles.getRolesForUser(userId);

        if (Roles.userIsInRole(userId, ['admin'])) {
            return {};
        }

        return {
            $or: [
                {
                    'meta.userId': userId
                },
                {
                    'meta.permissions.view': {
                        $elemMatch: {$in: rolesForUser}
                    }
                }
            ]
        }
    }
};