angular.module('cheatsheet')
    .directive('csfEditableText',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/SemanticUi/csfEditableText/Templates/csfEditableText.ng.html',
                scope: {
                    text: '=',
                    canEdit: '='
                },
                link: function(scope, element, attrs) {
                    scope.enableEditing = function() {
                        if(scope.canEdit) {
                            scope.isEditing = true;
                            setTimeout(function() {
                                element.find('input').focus();
                            }, 0);
                        }
                    };

                    scope.disableEditing = function() {
                        scope.isEditing = false;
                    };
					
					scope.onKeypress = function(e) {
						if (e.keyCode == 27) { // The user pressed Escape
							scope.disableEditing();
						}
					};

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                        element.find('input').off('blur');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
