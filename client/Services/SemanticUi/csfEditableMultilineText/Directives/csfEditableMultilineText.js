angular.module('cheatsheet')
    .directive('csfEditableMultilineText',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/SemanticUi/csfEditableMultilineText/Templates/csfEditableMultilineText.ng.html',
                scope: {
                    text: '='
                },
                link: function(scope, element, attrs) {
                    scope.enableEditing = function() {
                        if(element.hasClass('csf-editable')) {
                            scope.isEditing = true;
                            setTimeout(function() {
                                element.find('textarea').focus();
                            }, 0);
                        }
                    };

                    scope.disableEditing = function() {
                        scope.isEditing = false;
                    };

                    element.find('textarea').on('blur', function() {
                        scope.$apply(scope.disableEditing);
                    });

                    scope.$on('$destroy', function() {
                        element.find('textarea').off('blur');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
