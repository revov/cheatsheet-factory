Avatars.filters({
    maxSize: 1024 * 1024, // in bytes = 1mb
    allow: {
        contentTypes: ['image/*']
    }
});

Avatars.allow({
    download: function(userId) {
        return Roles.userIsInRole(userId, ['admin', 'member']);
    },
    insert: function(userId, fileObj) {
        if( Roles.userIsInRole(userId, 'admin') ) {
            return true;
        }

        return Roles.userIsInRole(userId, 'member') && userId == fileObj.userId;
    },
    update: function(userId, fileObj) {
        if( Roles.userIsInRole(userId, 'admin') ) {
            return true;
        }

        return userId == fileObj.userId;
    }
});

// When inserting a new avatar we need to remove the old one
Avatars.files.after.insert(function(userId, doc) {
    console.log('Deleting old files');
    Avatars.remove({
        $and: [
            {userId: userId},
            {_id: {$ne: doc._id}}
        ]
    });
});

Meteor.publish('avatars', function ( userIds ){
    return Avatars.find({
        userId: {
            $in: userIds
        }
    });
});
