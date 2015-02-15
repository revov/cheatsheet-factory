angular.module('cheatsheet').controller('CheatsheetController', [
    '$scope', 'csfUserSettings',
    function($scope, csfUserSettings) {
        var me = this,
            editor = null;
        me.UserSettings = {};

        csfUserSettings.UserSettingsPromise
            .then(
                function(userSettings) {
                    me.UserSettings = userSettings;

                    editor = ace.edit("aceEditor");
                    editor.getSession().setMode("ace/mode/javascript");
                    editor.$blockScrolling = Infinity;
                    editor.insert(
                        'function foo(items) {\n' +
                        '   var x = "All this is syntax highlighted";\n' +
                        '   return x;\n' +
                        '}\n'
                    );
                }
            );

        // Watches
        $scope.$watch( 'cheatsheet.UserSettings.editorTheme', function(newValue, oldValue) {
            if(editor) {
                editor.setTheme(newValue);
            }
        });

        $scope.$watch( 'cheatsheet.UserSettings.editorFontSize', function(newValue, oldValue) {
            if(editor) {
                editor.setFontSize( parseInt(newValue, 10) );
            }
        });

        $scope.$on('$destroy', function() {
            if(typeof editor.destroy == 'function') {
                editor.destroy();
            }
        });
    }
]);