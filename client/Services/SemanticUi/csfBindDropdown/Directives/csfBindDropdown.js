angular.module('cheatsheet')
    .directive('csfBindDropdown',
        function() {
            return {
                restrict : 'A',
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
                        // Wrapping the following logic in $applyAsync as a way to prevent setting a value
                        // before items have been generated with ngRepeat
                        scope.$applyAsync(function() {
                            if(suspendAngularHandler) {
                                suspendAngularHandler = false;
                                return;
                            }

                            suspendSemanticHandler = true;
                            element.dropdown('set selected', newValue);
                        });
                    });

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                        element.dropdown('destroy');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    );
