angular.module('cheatsheet')
    .directive('csfCheatCodeSnippet', [
        'csfAceEditor',
        function(csfAceEditor) {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatCodeSnippet/Templates/csfCheatCodeSnippet.ng.html',
                scope: {
                    component: '=',
                    canI: '='
                },
                link: function(scope, element, attrs) {
                    var isEditing;
                    var $staticHighlightElement = element.find('csf-static-highlight');

                    scope.edit = function() {
                        if(!scope.canI.edit) { return; }
                        if(isEditing) { return; }

                        isEditing = true;

                        var editor = csfAceEditor.acquire( $staticHighlightElement );
                        var session = editor.getSession();
                        session.setMode("ace/mode/" + scope.component.meta.lang);
                        editor.setValue(scope.component.meta.code);
                        editor.selection.clearSelection();

                        csfAceEditor.onRelease = function(env, args, request) {
                            scope.component.meta.code = editor.getValue();
                            isEditing = false;
                            csfAceEditor.onRelease = null; // Unsubscribe - we are already dettached.
                            scope.$applyAsync();
                        };

                        setTimeout(function() {editor.focus();}, 0);
                    };

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                        if(isEditing) {
                            csfAceEditor.release();
                        }
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
