Cheatsheets = new Mongo.Collection("cheatsheets");
Cheatsheets.attachSchema(Schemas.cheatsheet);

if(Meteor.isServer) {
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

            return CanI.edit.cheatsheet(doc);
        }
    });

    Meteor.publish('cheatsheets', function() {
        return Cheatsheets.find( RestrictionsTo.view.cheatsheet(this.userId), {fields: {content: 0}} );
    });

    Meteor.publish('view-cheatsheet', function(cheatsheetId) {
        return Cheatsheets.find(
            {
                $and: [
                    {_id: cheatsheetId},
                    RestrictionsTo.view.cheatsheet(this.userId)
                ]
            }
        );
    });
}