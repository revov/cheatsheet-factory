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
                    var _nextTabIndex = 0;
                    scope.tabId = Meteor.uuid();

                    scope.remove = function(index) {
                        scope.component.content.splice(index, 1);
                        scope.component.meta.tabNames.splice(index, 1);
                        element.find('.tabular.menu > .item:first').addClass('active');
                        element.find('.attached.tab.segment:first').addClass('active');
                    };

                    scope.insert = function(component, index) {
                        scope.component.content.splice(index, 0, component);
                        scope.component.meta.tabNames.splice( index, 0, '_tab' + (++_nextTabIndex) );
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
