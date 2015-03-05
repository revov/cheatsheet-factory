CanI = {};

CanI.viewPage = function viewPage( page ) {
    var currentUser = Meteor.user();
    if( _.contains([
            'home',
            'login',
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

CanI.edit = {};