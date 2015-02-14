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

Schemas.userSettings = new SimpleSchema({
    userId: {
        type: String
    },
    editorTheme: {
        type: String,
        defaultValue: 'dawn'
    },
    editorFontSize: {
        type: Number,
        min: 8,
        defaultValue: 18
    }
});