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

                    scope.$on('$destroy', function() {
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
