angular.module('cheatsheet')
    .factory('csfStaticHighlight',
        function($rootScope) {
            var cache = {
                highlighter: ace.require("ace/ext/static_highlight"),
                highlightModes: {},
                themes: {}
            };

            return {
                render: function(code, mode, editorSettings) {
                    cache.highlightModes[mode] = cache.highlightModes[mode] || new (ace.require(mode).Mode)();
                    cache.themes[editorSettings.theme] = cache.themes[editorSettings.theme] || ace.require(editorSettings.theme);

                    var highlighted = cache.highlighter.render(code.trim(), cache.highlightModes[mode], cache.themes[editorSettings.theme], 1, true);
                    highlighted.css = highlighted.css.replace('font-size: 12px', 'font-size: ' + parseInt(editorSettings.fontSize, 10) + 'px');
                    $('style#ace_highlight').remove();
                    $('head').append($('<style id="ace_highlight">' + highlighted.css + '</style>'));

                    return highlighted.html;
                }
            };
        }
    );
