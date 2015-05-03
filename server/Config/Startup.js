Meteor.startup(function() {
    Accounts.config({
        forbidClientAccountCreation: true,
        loginExpirationInDays: 3
    });
});