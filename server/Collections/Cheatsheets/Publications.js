Meteor.publish('cheatsheets', function() {
    var cheatsheetsCursor = Cheatsheets.find( RestrictionsTo.view.cheatsheet(this.userId), {fields: {content: 0}} );

    if (Roles.userIsInRole(this.userId, 'member')) {
        var userIds = [];
        cheatsheetsCursor.forEach(function(cheatsheet) {
            userIds.push(cheatsheet.meta.userId);
        });

        //TODO: make this reactive
        var userNamesNonReactiveCursor = Meteor.users.find({_id: {$in: userIds}}, {fields: {'profile.firstName': 1, 'profile.lastName': 1}});

        return [cheatsheetsCursor, userNamesNonReactiveCursor];
    } else {
        return cheatsheetsCursor;
    }
});

Meteor.publish('view-cheatsheet', function(cheatsheetId) {
    return Cheatsheets.find(
        {
            $and: [
                {_id: cheatsheetId},
                RestrictionsTo.view.cheatsheet(this.userId)
            ]
        }
    );
});