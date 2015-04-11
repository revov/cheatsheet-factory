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
