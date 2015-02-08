angular.module('cheatsheet').controller('CheatsheetController', [
    '$scope',
    function($scope) {
        var me = this;

        AceEditor.instance("aceEditor",
            {
                theme:"dawn",
                mode:"javascript",
                fontSize: 18
            },
            function editorLoaded(editor) {
                editor.insert(
                        'function foo(items) {\n' +
                        '   var x = "All this is syntax highlighted";\n' +
                        '   return x;\n' +
                        '}\n'
                );
                editor.setFontSize(18);
                me.ready = true;
                if( !$scope.$$phase ) {
                    $scope.$apply();
                }
            });

        $scope.$on('$destroy', function() {
            AceEditor.instance("aceEditor").destroy();
        });
    }
]);