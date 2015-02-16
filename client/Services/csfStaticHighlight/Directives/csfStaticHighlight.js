angular.module('cheatsheet')
    .directive('csfStaticHighlight', [
        'csfUserSettings',
        function(csfUserSettings) {
            return {
                restrict : 'E',
                replace: true,
                template: '<div></div>',
                scope: {
                    textToHighlight: '@',
                    mode: '@'
                },
                link: function(scope, element, attrs) {
                    console.log('WARN: TODO: Finish the static highlighter');
                    var highlighter, HighlightMode, theme, dom, data;
                    csfUserSettings.UserSettingsPromise.then(
                        function(value) {
                            scope.UserSettings = value;

                            highlighter = ace.require("ace/ext/static_highlight");
                            HighlightMode = ace.require(scope.mode).Mode;
                            theme = ace.require(scope.UserSettings.editorTheme);
                            dom = ace.require("ace/lib/dom");
                            data = scope.textToHighlight;

                            var highlighted = highlighter.render(data, new HighlightMode(), theme);
                            dom.importCssString(highlighted.css, "ace_highlight");
                            element.html(highlighted.html);
                        }
                    );
                }
            };
        }
    ]);
