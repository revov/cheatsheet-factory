angular.module('cheatsheet')
    .directive('csfBindDropdown',
        function() {
            return {
                restrict : 'A',
                replace: true,
                scope: {
                    selected: '=csfBindDropdown'
                },
                link: function(scope, element, attrs) {
                    var suspendSemanticHandler = false;
                    var suspendAngularHandler = false;

                    element.dropdown({
                        allowTab: false,
                        onChange: function(value, text, $choice) {
                            if(suspendSemanticHandler) {
                                suspendSemanticHandler = false;
                                return;
                            }

                            suspendAngularHandler = true;
                            scope.selected = value;
                            scope.$apply();
                        }
                    });

                    scope.$watch('selected', function (newValue, oldValue) {
                        if(suspendAngularHandler) {
                            suspendAngularHandler = false;
                            return;
                        }

                        suspendSemanticHandler = true;
                        element.dropdown('set selected', newValue);
                    });


                }
            };
        }
    );
