if(Meteor.isClient) {
    var acePath = "/packages/meteor-ace-editor/ace-builds/src-noconflict/";

    ace.config.set("modePath", acePath);
    ace.config.set("themePath", acePath);
    ace.config.set("workerPath", acePath);
    ace.config.set("basePath", acePath);
}
