Package.describe({
    name: 'meteor-ace-editor',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Integrating Ace editor with Meteor',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

var fs = Npm.require("fs");
var path = Npm.require("path");
var base = path.resolve('.');

Package.onUse(function(api) {
    api.versionsFrom('1.0.3.1');

    var files = fs.readdirSync(base+'/packages/meteor-ace-editor/ace-builds/src-noconflict');
    files.forEach(function(file){
        if(file.substr(-3)===".js"){
            switch (file) {
                case 'worker-javascript.js':
                  api.add_files('ace-builds/src-noconflict/'+file, 'client', {isAsset: true});
                  break;
                default:
                  api.add_files('ace-builds/src-noconflict/'+file, 'client');
            }
        }
    });

    files = fs.readdirSync(base+'/packages/meteor-ace-editor/ace-builds/src-noconflict/snippets');
    files.forEach(function(file){
        if(file.substr(-3)===".js"){
            api.add_files('ace-builds/src-noconflict/snippets/'+file, 'client');
        }
    });

    api.addFiles('meteor-ace-editor.js');
    // No need to export anything - Ace is defined on the window object;
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('meteor-ace-editor');
    api.addFiles('meteor-ace-editor-tests.js');
});
