Cheatsheets = new Mongo.Collection("cheatsheets");
Cheatsheets.attachSchema(Schemas.cheatsheet);

if(Meteor.isServer) {
    Cheatsheets.allow({
        insert: function(userId, doc, fieldNames, modifier) {
            return CanI.create.cheatsheet();
        }
    });
}