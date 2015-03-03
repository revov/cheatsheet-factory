angular.module('cheatsheet').controller('CheatsheetController', [
    '$scope', 'csfUserSettings',
    function($scope, csfUserSettings) {
        var cheatsheet = this,
            editor = null;
        cheatsheet.UserSettings = {};

        csfUserSettings.UserSettingsPromise
            .then(
                function(userSettings) {
                    cheatsheet.UserSettings = userSettings;

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


        cheatsheet.data = 'function foo(items) {\n' +
            '   var x = "All this is syntax highlighted";\n' +
            '   return x;\n' +
            '}\n';
        cheatsheet.php =
            '<?php\n'+
            '\n'+
            'function nfact($n) {\n'+
            '    if ($n == 0) {\n'+
            '        return 1;\n'+
            '    }\n'+
            '    else {\n'+
            '        return $n * nfact($n - 1);\n'+
            '    }\n'+
            '}\n'+
            '\n'+
            'echo "\\n\\nPlease enter a whole number ... ";\n'+
            '$num = trim(fgets(STDIN));\n'+
            '\n'+
            '// ===== PROCESS - Determing the factorial of the input number =====\n'+
            '$output = "\\n\\nFactorial " . $num . " = " . nfact($num) . "\\n\\n";\n'+
            'echo $output;\n'+
            '\n'+
            '?>';

//-----------------------------------------------------------------------------------------

        cheatsheet.sample = {
            type: 'cheatsheet',
            meta: {
                userId: 'iivEF5M297g2hxrhf',
                name: 'Sample Cheatsheet',
                canI: {
                    edit: true
                }
            },
            content: {
                type: 'container.newsletter',
                meta: {
                    columns: {
                        1: ['1', '2', '3'],
                        2: ['4', '5'],
                        3: ['6']
                    }
                },
                content: {
                    1: {
                        type: 'cheat.codeSnippet',
                        meta: {
                            code: cheatsheet.data,
                            lang: 'javascript',
                            header: 'Sample'
                        }
                    },
                    2: {
                        type: 'cheat.codeSnippet',
                        meta: {
                            code: cheatsheet.data,
                            lang: 'javascript',
                            header: 'Another Sample'
                        }
                    },
                    3: {
                        type: 'cheat.codeSnippet',
                        meta: {
                            code: cheatsheet.data,
                            lang: 'javascript',
                            header: 'Yet another Sample'
                        }
                    },
                    4: {
                        type: 'cheat.codeSnippet',
                        meta: {
                            code: cheatsheet.php,
                            lang: 'php',
                            header: 'PHP code'
                        }
                    },
                    5: {
                        type: 'cheat.codeSnippet',
                        meta: {
                            code: cheatsheet.data,
                            lang: 'javascript',
                            header: 'Header'
                        }
                    },
                    6: {
                        type: 'cheat.codeSnippet',
                        meta: {
                            code: cheatsheet.data,
                            lang: 'javascript',
                            header: 'I am codeSnippet'
                        }
                    }

                }
            }
        }


    }
]);