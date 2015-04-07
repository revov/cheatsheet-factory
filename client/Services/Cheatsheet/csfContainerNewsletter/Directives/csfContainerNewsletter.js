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
                    scope.$watch('component.meta.columns', function( newValue, oldValue ) {
                        switch( Object.keys(newValue).length ) {
                            case 1: scope.columnCount = 'one column row';
                                break;
                            case 2: scope.columnCount = 'two column row';
                                break;
                            case 3: scope.columnCount = 'three column row';
                                break;
                            case 4: scope.columnCount = 'four column row';
                                break;
                            default: scope.columnCount = 'one column row';
                        }
                    });

                    scope.add = function(cheatType, column) {
                        var newIndex = scope.limit(column-1);
                        ++scope.component.meta.columns[column];

                        scope.component.content.splice(
                            newIndex,
                            0,
                            {
                                type: cheatType,
                                meta: {
                                    code: '',
                                    lang: 'javascript',
                                    header: 'New Cheat'
                                }
                            }
                        );
                    };

                    scope.remove = function(column, indexInColumn) {
                        var generalIndex = scope.limit(column-2) + indexInColumn;
                        --scope.component.meta.columns[column];
                        scope.component.content.splice(generalIndex, 1);
                    };

                    scope.moveUp = function(column, indexInColumn) {
                        var isInFirstColumn = (column == 1);
                        var isFirstInColumn = (indexInColumn == 0);
                        var generalIndex = scope.limit(column-2) + indexInColumn;

                        // If we are the last item, forbid moving up
                        if( isInFirstColumn && isFirstInColumn ) {
                            return;
                        }

                        if( isFirstInColumn ) {
                            ++scope.component.meta.columns[column - 1];
                            --scope.component.meta.columns[column];
                            return;
                        }
                        scope.component.content[generalIndex-1] = scope.component.content.splice(generalIndex, 1, scope.component.content[generalIndex-1])[0];
                    };

                    scope.moveDown = function(column, indexInColumn) {
                        var isInLastColumn = (column == Object.keys(scope.component.meta.columns).length && indexInColumn);
                        var isLastInColumn = (indexInColumn == scope.component.meta.columns[column] - 1);
                        var generalIndex = scope.limit(column-2) + indexInColumn;

                        // If we are the last item, forbid moving down
                        if( isInLastColumn && isLastInColumn ) {
                            return;
                        }

                        if( isLastInColumn ) {
                            ++scope.component.meta.columns[column + 1];
                            --scope.component.meta.columns[column];
                            return;
                        }

                        scope.component.content[generalIndex] = scope.component.content.splice(generalIndex + 1, 1, scope.component.content[generalIndex])[0];
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
