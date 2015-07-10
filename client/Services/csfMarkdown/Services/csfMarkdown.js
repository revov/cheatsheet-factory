angular.module('cheatsheet')
    .service('csfMarkdown', [
        'csfStaticHighlight',
        function(csfStaticHighlight) {
            var me = this;
            var userSettings;

            function setOptions(userSettings) {
                var options = {
                    sanitize: true
                };

                if(userSettings && userSettings.editor) {
                    options.highlight = function (code, lang) {
                        return  '<div class="ui compact segment">' +
                                    csfStaticHighlight.render(code, lang, userSettings.editor) +
                                '</div>';
                    }
                }

                marked.setOptions(options);
            }

            this.render = function(text, userSettings) {
                setOptions(userSettings);
                return marked(text);
            }
        }
    ]);
