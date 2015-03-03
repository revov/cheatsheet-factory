angular.module('cheatsheet')
    .directive('csfCheatCodeSnippet',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatCodeSnippet/Templates/csfCheatCodeSnippet.ng.html',
                scope: {
                    component: '='
                },
                link: function(scope, element, attrs) {
                    //element.find('.csf-cheat-code-snippet-wrapper').popup({
                    //    inline: true,
                    //    hoverable: true,
                    //    position : 'bottom left',
                    //    delay: {
                    //        show: 800,
                    //        hide: 200
                    //    }
                    //});

                    scope.$on('$destroy', function() {
                        //element.find('.csf-cheat-code-snippet-wrapper').popup('destroy');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
