angular.module('cheatsheet').controller('DevController', [
    '$scope', 'csfUserSettings',
    function($scope, csfUserSettings) {
        var dev = this,
            editor = null;
        dev.UserSettings = {};

        dev.data = 'function foo(items) {\n' +
            '   var x = "All this is syntax highlighted";\n' +
            '   return x;\n' +
            '}\n';
        dev.php =
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

        dev.sample = {
            type: 'cheatsheet',
            meta: {
                userId: 'iivEF5M297g2hxrhf',
                name: 'Sample Cheatsheet',
                description: '# (GitHub-Flavored) Markdown\n' +
                    '\n' +
                    'A list:\n' +
                    '* foo\n' +
                    '* bar\n' +
                    '* baz\n' +
                    '\n' +
                    'And here\'s some code! :\n' +
                    '\n' +
                    '```javascript\n' +
                    '$(function(){\n' +
                    '  $(\'div\').html(\'I am a div.\');\n' +
                    '});\n' +
                    '```' +
                    '\n' +
                    'See [docs](https://help.github.com/articles/github-flavored-markdown/) for more info',
                permissions: {
                    view: ['member'],
                    edit: ['member']
                }
            },
            content: [
                {
                    type: 'container.newsletter',
                    meta: {
                        columnsSize: [3, 2, 1]
                    },
                    content: [
                        {
                            type: 'cheat.codeSnippet',
                            meta: {
                                code: dev.data,
                                lang: 'javascript',
                                header: 'Sample'
                            }
                        },
                        {
                            type: 'cheat.codeSnippet',
                            meta: {
                                code: dev.data,
                                lang: 'javascript',
                                header: 'Another Sample'
                            }
                        },
                        {
                            type: 'cheat.codeSnippet',
                            meta: {
                                code: dev.data,
                                lang: 'javascript',
                                header: 'Yet another Sample'
                            }
                        },
                        {
                            type: 'cheat.codeSnippet',
                            meta: {
                                code: dev.php,
                                lang: 'php',
                                header: 'PHP code'
                            }
                        },
                        {
                            type: 'container.newsletter',
                            meta: {
                                columnsSize: [3, 2, 1]
                            },
                            content: [
                                {
                                    type: 'cheat.codeSnippet',
                                    meta: {
                                        code: dev.data,
                                        lang: 'javascript',
                                        header: 'Sample'
                                    }
                                },
                                {
                                    type: 'cheat.codeSnippet',
                                    meta: {
                                        code: dev.data,
                                        lang: 'javascript',
                                        header: 'Another Sample'
                                    }
                                },
                                {
                                    type: 'cheat.codeSnippet',
                                    meta: {
                                        code: dev.data,
                                        lang: 'javascript',
                                        header: 'Yet another Sample'
                                    }
                                },
                                {
                                    type: 'cheat.codeSnippet',
                                    meta: {
                                        code: dev.php,
                                        lang: 'php',
                                        header: 'PHP code'
                                    }
                                },
                                {
                                    type: 'cheat.codeSnippet',
                                    meta: {
                                        code: dev.data,
                                        lang: 'javascript',
                                        header: 'Header'
                                    }
                                },
                                {
                                    type: 'cheat.codeSnippet',
                                    meta: {
                                        code: dev.data,
                                        lang: 'javascript',
                                        header: 'I am codeSnippet'
                                    }
                                }
                            ]
                        },
                        {
                            type: 'cheat.codeSnippet',
                            meta: {
                                code: dev.data,
                                lang: 'javascript',
                                header: 'I am codeSnippet'
                            }
                        }
                    ]
                }
            ]
        };

//-----------------------------------------------------------------------------------------


    }
]);