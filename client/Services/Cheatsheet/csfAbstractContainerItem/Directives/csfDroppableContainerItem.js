angular.module('cheatsheet')
    .directive('csfDroppableContainerItem', [
        '$parse',
        function($parse) {
            return {
                restrict : 'A',
                link: function(scope, element, attrs) {
                    element.droppable({
                        accept: 'csf-abstract-container-item',
                        greedy: true,
                        hoverClass: 'csf-drag-hover',
                        tolerance: 'pointer',
                        drop: function(event, ui) {
                            var csfComponent = angular.copy( ui.draggable.data('csfComponent') );
                            delete csfComponent.$$hashKey; // Just in case

                            // We remove the component from the draggable so that it will know the item was accepted
                            // and inform its current container to remove it from its old place
                            ui.draggable.removeData('csfComponent');

                            // Now let's tell the accepting container to insert the component into its new place
                            scope.$apply(function() {
                                dropHandler = $parse(attrs.csfDroppableContainerItem);
                                dropHandler(scope, {csfComponent: csfComponent});
                            });
                        }
                    });

                    /**
                     * Cleanup
                     */
                    element.on('$destroy', function() {
                        // TODO: See why droppable is destroyed before it gets here and thus this code never executes
                        if( element.droppable('instance') ) {
                            element.droppable('destroy');
                        }
                    });
                }
            };
        }
    ]);
