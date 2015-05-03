Meteor.startup(function() {
    var configCursor = Configuration.find();
    if( !configCursor.count() ) {
        Configuration.insert({});
    }

    var config = Configuration.findOne();

    process.env.MAIL_URL = 'smtp://' + config.mail.username + ':' + config.mail.password + '@' + config.mail.host + ':' + config.mail.port;

});