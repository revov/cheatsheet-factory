Cheatsheets.allow({
    insert: function(userId, doc) {
        return CanI.create.cheatsheet();
    },
    update: function(userId, doc, fieldNames, modifier) {
        return CanI.edit.cheatsheet(doc);
    },
    remove: function(userId, doc) {
        return CanI.edit.cheatsheet(doc);
    }
});
