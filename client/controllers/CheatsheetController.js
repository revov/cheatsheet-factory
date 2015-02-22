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
        $scope.$watch(
            'cheatsheet.UserSettings.editor',
            function(newValue, oldValue) {
                if( newValue && newValue.theme ) {
                    editor.setTheme(newValue.theme);
                }
                if( newValue && newValue.fontSize ) {
                    editor.setFontSize( parseInt(newValue.fontSize, 10) )
                }
            },
            true
        );

        $scope.$on('$destroy', function() {
            if(typeof editor.destroy == 'function') {
                editor.destroy();
            }
        });


        this.data = 'function foo(items) {\n' +
            '   var x = "All this is syntax highlighted";\n' +
            '   return x;\n' +
            '}\n';
    }
]);