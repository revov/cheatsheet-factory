angular.module('cheatsheet')
    .directive('csfAbstractComponent', [
        '$compile',
        function($compile) {
            return {
                restrict : 'E',
                replace: true,
                scope: {
                    component: '=',
                    canI: '='
                },
                link: function(scope, element, attrs) {
                    var elementForCompilation;

                    function buildElementForCompilation(directive) {
                        return angular.element('<'+directive+' component="component" can-i="canI"></'+directive+'>');
                    }

                    switch(scope.component.type) {
                        case 'container.newsletter' :
                            elementForCompilation = buildElementForCompilation('csf-container-newsletter');
                            break;
                        case 'container.tab' :
                            elementForCompilation = buildElementForCompilation('csf-container-tab');
                            break;
                        case 'cheat.codeSnippet' :
                            elementForCompilation = buildElementForCompilation('csf-cheat-code-snippet');
                            break;
                        case 'cheat.markdown' :
                            elementForCompilation = buildElementForCompilation('csf-cheat-markdown');
                            break;
                        default:
                            elementForCompilation = buildElementForCompilation('div');
                    }

                    element.replaceWith(elementForCompilation);
                    // Since 'element' is detached from the DOM we should drop the reference to it to prevent
                    // memory leaks. Compile will make yet another replace so we will lose track to the compiled element.
                    // But we don't really care for it anymore - the concrete directive has it and we are just a mediator.
                    element = null;
                    $compile(elementForCompilation)(scope);

                }
            };
        }
    ]);
