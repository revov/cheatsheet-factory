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

    return currentUser ? true: false;
};