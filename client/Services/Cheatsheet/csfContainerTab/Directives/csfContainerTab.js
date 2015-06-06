angular.module('cheatsheet')
    .directive('csfContainerTab',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfContainerTab/Templates/csfContainerTab.ng.html',
                scope: {
                    component: '=',
                    canI: '='
                },
                link: function(scope, element, attrs) {
                    var _nextTabNumber = 0;
                    scope.activeTabIndex = 0;

                    scope.setActiveTab = function(index) {
                        scope.activeTabIndex = index;
                    };

                    scope.remove = function(index) {
                        scope.component.content.splice(index, 1);
                        scope.component.meta.tabNames.splice(index, 1);
                        scope.activeTabIndex = scope.component.content.length - 1;
                    };

                    scope.insert = function(component, index) {
                        scope.component.content.splice(index, 0, component);
                        scope.component.meta.tabNames.splice( index, 0, '_tab' + (++_nextTabNumber) );
                        scope.activeTabIndex = scope.component.content.length - 1;
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
