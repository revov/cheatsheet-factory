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
var srcDir = 'ace-builds/src-noconflict/';
var base = path.resolve('.') + '/packages/meteor-ace-editor/';


Package.onUse(function(api) {
    api.versionsFrom('1.0.3.1');

    var files = fs.readdirSync(base + srcDir);
    files.forEach(function(file){
        if(file.substr(-3)===".js"){
            api.add_files(
                srcDir + file,
                'client',
                {isAsset: file.substr(0, 7) === 'worker-'}
            );
        }
    });

    files = fs.readdirSync(base + srcDir + 'snippets');
    files.forEach(function(file){
        if(file.substr(-3)===".js"){
            api.add_files(srcDir + 'snippets/'+file, 'client', {isAsset: true});
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
