Schemas = {};

Schemas.cheat = new SimpleSchema({
    type: {
        type: String
    },
    meta: {
        type: Object,
        optional: true
    },
    content: {
        type: Object
    }
});

Schemas.cheatsheet = new SimpleSchema({
    name: {
        type: String,
        regEx: /^[a-zA-Z-]{2,60}$/,
        index: true,
        unique: true
    },
    userId: {
        type: String
    },
    cheats: {
        type: Schemas.cheat
    }
});

/*******************************************
 * User Settings
 ******************************************/
var editor = new SimpleSchema({
    theme: {
        type: String,
        defaultValue: 'ace/theme/tomorrow_night'
    },
    fontSize: {
        type: Number,
        min: 8,
        defaultValue: 18
    }
});
Schemas.userSettings = new SimpleSchema({
    userId: {
        type: String
    },
    editor: {
        type: editor
    }
});