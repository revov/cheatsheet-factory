angular.module('cheatsheet')
    .directive('csfAbstractComponent', [
        'csfUserSettings', '$compile',
        function(csfUserSettings, $compile) {
            return {
                restrict : 'E',
                replace: true,
                scope: {
                    component: '='
                },
                link: function(scope, element, attrs) {
                    function replace (cloned, scope) {
                        element.replaceWith(cloned);
                    };

                    function buildComponentHTML(directive) {
                        return '<'+directive+' component="component"></'+directive+'>'
                    }

                    switch(scope.component.type) {
                        case 'cheat.codeSnippet' :
                            $compile( buildComponentHTML('csf-cheat-code-snippet') )(scope, replace);
                            break;
                        default:
                            $compile( buildComponentHTML('div') )(scope, replace);
                    }


                    scope.$on('$destroy', function() {
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
