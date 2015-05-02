Meteor.startup(function() {
    Accounts.config({
        forbidClientAccountCreation: true,
        loginExpirationInDays: 3
    });

    if( !Configuration.find().count() ) {
        Configuration.insert({});
    }
});