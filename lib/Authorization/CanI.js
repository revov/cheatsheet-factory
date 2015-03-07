CanI = {};

CanI.viewPage = function viewPage( page ) {
    var currentUser = Meteor.user();
    if( _.contains([
            'home',
            'login',
            'register',
            '403'
        ], page)
    ) {
        return true;
    }

    if(!currentUser) {
        return false;
    }

    if(page === 'admin') {
        return Roles.userIsInRole(currentUser._id, 'admin');
    }

    return currentUser ? true: false;
};

CanI.edit = {
    cheatsheet: function( cheatsheet ) {
        var currentUser = Meteor.user();

        if( Roles.userIsInRole(currentUser, 'admin') ) {
            return true;
        } else if( currentUser._id === cheatsheet.meta.userId ) {
            return true;
        } else if( Roles.userIsInRole(currentUser, cheatsheet.meta.permissions.edit) ) {
            return true;
        }

        return false;
    }
};