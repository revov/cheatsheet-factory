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

//-----------------------------------------------------------------------------------------

        cheatsheet.sample = {
            type: 'cheatsheet',
            meta: {
                userId: 'iivEF5M297g2hxrhf'
            },
            content: {
                type: 'container.newsletter',
                meta: {
                    columns: {
                        '1': ['1', '2', '3'],
                        '2': ['4', '5'],
                        '3': ['6'],
                        '4': ['7']
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
                            code: cheatsheet.data,
                            lang: 'javascript',
                            header: 'More code'
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
                    },
                    7: {
                        type: 'cheat.codeSnippet',
                        meta: {
                            code: cheatsheet.data,
                            lang: 'javascript',
                            header: 'Statically highlighted'
                        }
                    }

                }
            }
        }


    }
]);