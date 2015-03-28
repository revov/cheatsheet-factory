angular.module('cheatsheet')
    .directive('csfEditableText',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/SemanticUi/csfEditableText/Templates/csfEditableText.ng.html',
                scope: {
                    text: '='
                },
                link: function(scope, element, attrs) {
                    scope.enableEditing = function() {
                        if(element.hasClass('csf-editable')) {
                            scope.isEditing = true;
                            setTimeout(function() {
                                element.find('input').focus();
                            }, 0);
                        }
                    };

                    scope.disableEditing = function() {
                        scope.isEditing = false;
                    };

                    element.find('input').on('blur', function() {
                        scope.$apply(scope.disableEditing);
                    });

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
