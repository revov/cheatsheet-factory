Meteor.startup(function() {
    Accounts.config({
        loginExpirationInDays: 3
    });
});