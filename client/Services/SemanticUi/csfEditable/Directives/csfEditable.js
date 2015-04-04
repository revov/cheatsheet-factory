angular.module('cheatsheet')
    .directive('csfEditable',
        function() {
            return {
                restrict : 'A',
                link: function(scope, element, attrs) {
                    element.addClass('csf-editable');

                    scope.$watch(attrs.csfEditable, function(newV, oldV) {
                        if(newV) {
                            element.addClass('csf-editable-active');
                            element.attr('title', 'Double click to edit.');
                        } else {
                            element.removeClass('csf-editable-active');
                            element.attr('title', null);
                        }
                    });

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
