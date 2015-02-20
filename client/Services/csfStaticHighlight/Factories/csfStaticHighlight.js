angular.module('cheatsheet')
    .factory('csfStaticHighlight',
        function($rootScope) {
            var cache = {
                highlighter: ace.require("ace/ext/static_highlight"),
                dom: ace.require("ace/lib/dom"),
                highlightModes: {},
                themes: {}
            };

            return {
                render: function(code, mode, userSettings) {
                    cache.highlightModes[mode] = cache.highlightModes[mode] || new (ace.require(mode).Mode)();
                    cache.themes[userSettings.editorTheme] = cache.themes[userSettings.editorTheme] || ace.require(userSettings.editorTheme);

                    var highlighted = cache.highlighter.render(code.trim(), cache.highlightModes[mode], cache.themes[userSettings.editorTheme], 1, true);
                    highlighted.css = highlighted.css.replace('font-size: 12px', 'font-size: ' + parseInt(userSettings.editorFontSize, 10) + 'px');
                    cache.dom.importCssString(highlighted.css, "ace_highlight");

                    return highlighted.html;
                }
            };
        }
    );
