angular.module('cheatsheet')
    .directive('csfCodeSnippet',
        function() {
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
                            show: 800,
                            hide: 200
                        }
                    });

                    scope.$on('$destroy', function() {
                        element.find('.csf-code-snippet-wrapper').popup('destroy');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
