angular.module('cheatsheet')
    .directive('csfContainerNewsletter',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfContainerNewsletter/Templates/csfContainerNewsletter.ng.html',
                replace: true,
                scope: {
                    component: '=',
                    canI: '='
                },
                link: function(scope, element, attrs) {
                    scope.$watch('component.meta.columns', function( newValue, oldValue ) {
                        element.removeClass();
                        switch( Object.keys(newValue).length ) {
                            case 1: element.addClass("one column row");
                                break;
                            case 2: element.addClass("two column row");
                                break;
                            case 3: element.addClass("three column row");
                                break;
                            case 4: element.addClass("four column row");
                                break;
                            default: element.addClass("one column row");
                        }
                    });

                    scope.onAdded = function(cheatType, column) {
                        var newIndex = scope.limit(column-1);
                        ++scope.component.meta.columns[column];

                        scope.component.content.splice(
                            newIndex,
                            0,
                            {
                                type: cheatType,
                                meta: {
                                    code: '\n\n\n\n\n',
                                    lang: 'javascript',
                                    header: 'New Cheat'
                                }
                            }
                        );
                    };

                    /**
                     * Utils
                     */
                    scope.limit = function(index) {
                        var sum = 0;
                        for( var i = 0; i<=index; i++ ) {
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
