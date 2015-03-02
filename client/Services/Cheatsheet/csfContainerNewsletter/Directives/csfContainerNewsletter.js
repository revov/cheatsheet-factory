angular.module('cheatsheet')
    .directive('csfContainerNewsletter',
        function() {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfContainerNewsletter/Templates/csfContainerNewsletter.ng.html',
                replace: true,
                scope: {
                    component: '='
                },
                link: function(scope, element, attrs) {
                    scope.$watch('component.meta.columns', function( newValue, oldValue ) {
                        element.removeClass();
                        switch( Object.keys(newValue).length ) {
                            case 1: element.addClass("doubling one column row");
                                break;
                            case 2: element.addClass("doubling two column row");
                                break;
                            case 3: element.addClass("doubling three column row");
                                break;
                            case 4: element.addClass("doubling four column row");
                                break;
                            default: element.addClass("doubling one column row");
                        }
                    });

                    scope.$on('$destroy', function() {

                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
