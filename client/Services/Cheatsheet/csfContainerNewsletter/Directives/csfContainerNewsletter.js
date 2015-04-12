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
                    scope.$watchCollection('component.meta.columns', function( newValue, oldValue ) {
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
                        $rowElement.addClass( classMap[Object.keys(newValue).length] + ' column row' );
                    });

                    scope.add = function(component, column) {
                        var newIndex = scope.limit(column-1);
                        ++scope.component.meta.columns[column];

                        scope.component.content.splice(
                            newIndex,
                            0,
                            component
                        );
                    };

                    scope.remove = function(column, indexInColumn) {
                        var generalIndex = scope.limit(column-2) + indexInColumn;
                        --scope.component.meta.columns[column];
                        scope.component.content.splice(generalIndex, 1);
                    };

                    scope.insert = function(component, column, indexInColumn) {
                        var generalIndex = scope.limit(column-2) + indexInColumn;

                        ++scope.component.meta.columns[column];
                        scope.component.content.splice(generalIndex, 0, component);
                    };

                    scope.deleteColumn = function(column) {
                        var startIndex = scope.limit(column-2);

                        scope.component.content.splice(startIndex, scope.component.meta.columns[column]);

                        var numberOfColumns = Object.keys(scope.component.meta.columns).length;
                        for(var i = column; i<=numberOfColumns; i++) {
                            if( i == numberOfColumns ) {
                                delete scope.component.meta.columns[i];
                                break;
                            }
                            scope.component.meta.columns[i] = scope.component.meta.columns[i+1];
                        }
                    };

                    scope.addColumn = function() {
                        var numberOfColumns = Object.keys(scope.component.meta.columns).length;
                        scope.component.meta.columns[numberOfColumns + 1] = 0;
                    };

                    /**
                     * Utils
                     */
                    scope.limit = function(columnIndex) {
                        var sum = 0;
                        for( var i = 0; i<=columnIndex; i++ ) {
                            sum += scope.component.meta.columns[i+1];
                        }

                        return sum;
                    };

                    scope.offset = function(index) {
                        return scope.component.meta.columns[index+1];
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
