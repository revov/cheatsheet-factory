Schemas = {};

/*******************************************
 * User Settings
 ******************************************/
var meta = new SimpleSchema({
    userId: {
        type: String
    },
    name: {
        type: String,
        regEx: /^[a-zA-Z-]{2,60}$/,
        index: true,
        unique: true
    }
});
Schemas.cheatsheet = new SimpleSchema({
    type: {
        type: String,
        regEx: /^cheatsheet$/,
        defaultValue: 'cheatsheet'
    },
    meta: {
        type: meta
    },
    content: {
        type: [Object],
        blackbox: true
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