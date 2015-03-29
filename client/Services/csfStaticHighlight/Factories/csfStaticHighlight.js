angular.module('cheatsheet')
    .factory('csfStaticHighlight', [
        'csfStaticHighlightBaseStyles',
        function(csfStaticHighlightBaseStyles) {
            var cache = {
                highlighter: ace.require("ace/ext/static_highlight"),
                modelist: ace.require("ace/ext/modelist"),
                highlightModes: {},
                themes: {},
                currentEditorSettings: {},
                baseStyles: csfStaticHighlightBaseStyles
            };

            return {
                updateStyles: function(editorSettings, $element) {
                    if(!editorSettings) {
                        return;
                    }

                    if( !angular.equals(editorSettings, cache.currentEditorSettings) ) {
                        // get/cache the theme
                        cache.themes[editorSettings.theme] = cache.themes[editorSettings.theme] || ace.require(editorSettings.theme);

                        // Augment the base styles with the theme styles
                        var css = cache.baseStyles + cache.themes[editorSettings.theme];

                        // Set the font size
                        css = css.replace('font-size: 12px', 'font-size: ' + parseInt(editorSettings.fontSize, 10) + 'px');

                        // remove old styles
                        $('style#ace_highlight').remove();

                        // add the new style
                        $('head').append(
                            $('<style>', {
                                id: 'ace_highlight',
                                text: css
                            })
                        );

                        // Store the currently applied settings
                        cache.currentEditorSettings = angular.copy(editorSettings);
                    }

                    if(!$element) {
                        return;
                    }

                    // change the class of the element if supplied
                    $element.children(':first')
                        .removeClass()
                        .addClass( cache.themes[editorSettings.theme].cssClass );
                },
                render: function(code, mode, editorSettings) {
                    if(!editorSettings) {
                        return '<div>User settings not found</div>';
                    }

                    if(!cache.modelist.modesByName.hasOwnProperty(mode)) {
                        mode = 'text';
                    }

                    cache.highlightModes[mode] = cache.highlightModes[mode] || new (ace.require('ace/mode/'+mode).Mode)();
                    cache.themes[editorSettings.theme] = cache.themes[editorSettings.theme] || ace.require(editorSettings.theme);

                    this.updateStyles(editorSettings);

                    var highlighted = cache.highlighter.render(code.trim(), cache.highlightModes[mode], cache.themes[editorSettings.theme], 1, true);
                    highlighted.session.destroy();

                    return highlighted.html;
                }
            };
        }
    ]);
