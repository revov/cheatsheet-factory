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
                        return csfStaticHighlight.render(code, lang, userSettings.editor);
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
