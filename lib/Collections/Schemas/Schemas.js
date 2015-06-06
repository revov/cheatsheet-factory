Schemas = {};

/*******************************************
 * Cheatsheet
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
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return this.userId;
            } else if (this.isUpsert) {
                return {$setOnInsert: this.userId};
            }
        }
    },
    name: {
        type: String,
        regEx: /^.{2,60}$/,
        index: true
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            }
        }
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
        type: [Object],
        blackbox: true,
        optional: true
    }
});

/*******************************************
 * User Settings
 ******************************************/
var editor = new SimpleSchema({
    theme: {
        type: String,
        defaultValue: 'ace/theme/tomorrow'
    },
    fontSize: {
        type: Number,
        min: 8,
        defaultValue: 14
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

/*******************************************
 * Configuration
 ******************************************/
var emailConfig = new SimpleSchema({
    username: {
        type: String,
        defaultValue: 'changeMe'
    },
    password: {
        type: String,
        defaultValue: 'changeMe'
    },
    host: {
        type: String,
        defaultValue: 'changeMe'
    },
    port: {
        type: Number,
        defaultValue: 465
    }
});
Schemas.configuration = new SimpleSchema({
    mail: {
        type: emailConfig
    }
});