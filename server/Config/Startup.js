Meteor.startup(function() {
    Accounts.config({
        forbidClientAccountCreation: true,
        loginExpirationInDays: 5
    });

    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    }
});