Cheatsheets.allow({
    insert: function(userId, doc) {
        return CanI.create.cheatsheet();
    },
    update: function(userId, doc, fieldNames, modifier) {
        // Since Angular meteor updates objects by $set-ting all of their properties - this will be the only modifier we will allow
        if( !_.every(_.keys(modifier), function(item) {return item==='$set'}) ) {
            throw new Meteor.Error('403', 'Forbidden. Only $set modifier allowed.');
        }

        // Make sure someone does not attempt to modify meta.userId
        if(modifier.$set.meta.userId !== doc.meta.userId) {
            throw new Meteor.Error('403', 'Forbidden. Cannot change the author of the cheatsheet.');
        }

        // Make sure someone does not attempt to modify meta.createdAt
        if(modifier.$set.meta.createdAt.getTime() !== doc.meta.createdAt.getTime()) {
            throw new Meteor.Error('403', 'Forbidden. Cannot change the creation date of the cheatsheet.');
        }

        return CanI.edit.cheatsheet(doc);
    },
    remove: function(userId, doc) {
        return CanI.edit.cheatsheet(doc);
    }
});
