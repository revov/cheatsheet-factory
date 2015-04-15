angular.module('cheatsheet')
    .directive('csfAbstractContainerItem',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfAbstractContainerItem/Templates/csfAbstractContainerItem.ng.html',
                scope: {
                    component: '=',
                    canI: '=',
                    onRemoved: '&'
                },
                link: function(scope, element, attrs) {
                    element.draggable({
                        cursor: 'move',
                        handle: '.csf-container-controls .csf-drag-handle:first',
                        //helper: 'clone',
                        opacity: 0.35,
                        revert: true,
                        revertDuration: 100,
                        start: function(event, ui) {
                            element.data('csfComponent', scope.component);
                            element.parents('.csf-container:last')
                                .find('[csf-droppable-container-item]')
                                .css('display', 'block');
                        },
                        stop: function(event, ui) {
                            element.parents('.csf-container:last')
                                .find('[csf-droppable-container-item]')
                                .css('display', '');
                            // If a droppable has accepted the component it is removed from the element
                            // So we should make sure to inform our container to remove it from its old location
                            if( element.data('csfComponent') ) {
                                element.removeData('csfComponent');
                            } else {
                                scope.$apply(function() {
                                    scope.onRemoved();
                                });
                            }
                        }
                    });

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                    });

                    element.on('$destroy', function() {
                        if( element.draggable('instance') ) {
                            element.draggable('destroy');
                        }
                        scope.$destroy();
                    });
                }
            };
        }
    );
