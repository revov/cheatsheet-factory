angular.module('cheatsheet').controller('CheatsheetController', [
    '$scope',
    function($scope) {
        var me = this;

        var editor = ace.edit("aceEditor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");
        editor.setFontSize(18);
        editor.insert(
                        'function foo(items) {\n' +
                        '   var x = "All this is syntax highlighted";\n' +
                        '   return x;\n' +
                        '}\n'
                );

        $scope.$on('$destroy', function() {
            editor.destroy();
        });
    }
]);