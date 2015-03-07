Cheatsheets = new Mongo.Collection("cheatsheets");
Cheatsheets.attachSchema(Schemas.cheatsheet);

if(Meteor.isServer) {
    Cheatsheets.allow({
        insert: function(userId, doc, fieldNames, modifier) {
            return CanI.create.cheatsheet();
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