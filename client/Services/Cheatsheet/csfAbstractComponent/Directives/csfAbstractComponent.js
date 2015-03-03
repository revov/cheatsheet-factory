angular.module('cheatsheet')
    .directive('csfAbstractComponent', [
        'csfUserSettings', '$compile',
        function(csfUserSettings, $compile) {
            return {
                restrict : 'E',
                replace: true,
                scope: {
                    component: '=',
                    canI: '='
                },
                link: function(scope, element, attrs) {
                    switch(scope.component.type) {
                        case 'container.newsletter' :
                            $compile( buildComponentHTML('csf-container-newsletter') )(scope, replace);
                            break;
                        case 'cheat.codeSnippet' :
                            $compile( buildComponentHTML('csf-cheat-code-snippet') )(scope, replace);
                            break;
                        default:
                            $compile( buildComponentHTML('div') )(scope, replace);
                    }

                    function replace (cloned, scope) {
                        element.replaceWith(cloned);
                        // Since 'element' is detached from the DOM we should drop the reference to it to prevent
                        // memory leaks and make it point to the new node
                        element = cloned;
                    };

                    function buildComponentHTML(directive) {
                        return '<'+directive+' component="component" can-i="canI"></'+directive+'>'
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
