Schemas = {};

/*******************************************
 * User Settings
 ******************************************/
var permissions = new SimpleSchema({
    view: {
        type: [String]
    },
    edit: {
        type: [String]
    }
});
var meta = new SimpleSchema({
    userId: {
        type: String
    },
    name: {
        type: String,
        regEx: /^.{2,60}$/,
        index: true
    },
    description: {
        type: String
    },
    permissions: {
        type: permissions
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
        type: Object,
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