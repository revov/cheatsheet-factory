angular.module('cheatsheet')
    .directive('csfContainerNewsletter',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfContainerNewsletter/Templates/csfContainerNewsletter.ng.html',
                scope: {
                    component: '=',
                    canI: '='
                },
                link: function(scope, element, attrs) {
                    scope.$watchCollection('component.meta.columnsSize', function( newValue, oldValue ) {
                        var classMap = {
                            0: 'one',
                            1: 'one',
                            2: 'two',
                            3: 'three',
                            4: 'four'
                        };
                        var $rowElement = element.find('.ui.stackable.grid:first >div:first');
                        // We add classes manually because Semantic relies on class order and Angular messes it up
                        $rowElement.removeClass();
                        $rowElement.addClass( classMap[_.size(newValue)] + ' column row' );
                    });

                    scope.remove = function(columnIndex, indexInColumn) {
                        var generalIndex = scope.limit(columnIndex-1) + indexInColumn;
                        --scope.component.meta.columnsSize[columnIndex];
                        scope.component.content.splice(generalIndex, 1);
                    };

                    scope.insert = function(component, columnIndex, indexInColumn) {
                        var generalIndex = scope.limit(columnIndex-1) + indexInColumn;

                        ++scope.component.meta.columnsSize[columnIndex];
                        scope.component.content.splice(generalIndex, 0, component);
                    };

                    scope.removeColumn = function(columnIndex) {
                        var startIndex = scope.limit(columnIndex-1);

                        scope.component.content.splice(startIndex, scope.component.meta.columnsSize[columnIndex]);
                        scope.component.meta.columnsSize.splice(columnIndex, 1);
                    };

                    scope.addColumn = function() {
                        scope.component.meta.columnsSize.push(0);
                    };

                    /**
                     * Utils
                     */
                    scope.limit = function(columnIndex) {
                        var sum = 0;
                        for( var i = 0; i<=columnIndex; i++ ) {
                            sum += scope.component.meta.columnsSize[i];
                        }

                        return sum;
                    };

                    scope.offset = function(index) {
                        return scope.component.meta.columnsSize[index];
                    };

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
