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

    switch (page) {
        case 'admin':
            return Roles.userIsInRole(currentUser, 'admin');
        case 'cheatsheet':
            return Roles.userIsInRole(currentUser, 'member');
        case 'create-cheatsheet':
            return Roles.userIsInRole(currentUser, 'member');
        case 'dev':
            return Roles.userIsInRole(currentUser, 'dev');
        default:
            return false;
    }
};

CanI.create = {
    cheatsheet: function() {
        var currentUser = Meteor.user();

        if(!currentUser) {
            return false;
        }

        if( Roles.userIsInRole(currentUser, 'admin') ) {
            return true;
        }

        return Roles.userIsInRole(currentUser, 'member');
    }
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