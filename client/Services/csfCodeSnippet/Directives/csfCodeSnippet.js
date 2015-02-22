angular.module('cheatsheet')
    .directive('csfCodeSnippet', [
        'csfUserSettings',
        function(csfUserSettings) {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/csfCodeSnippet/Templates/csfCodeSnippet.ng.html',
                scope: {
                    code: '@',
                    lang: '@',
                    header: '@'
                },
                link: function(scope, element, attrs) {
                    element.find('.csf-code-snippet-wrapper').popup({
                        inline: true,
                        hoverable: true,
                        position : 'bottom left',
                        delay: {
                            hide: 200
                        }
                    });
                }
            };
        }
    ]);
