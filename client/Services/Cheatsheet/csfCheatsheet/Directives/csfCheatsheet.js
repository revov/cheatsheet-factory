angular.module('cheatsheet')
    .directive('csfCheatsheet', [
        'csfUserSettings', '$compile', '$timeout', 'Session',
        function(csfUserSettings, $compile, $timeout, Session) {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatsheet/Templates/csfCheatsheet.ng.html',
                replace: true,
                scope: {
                    component: '='
                },
                link: function(scope, element, attrs) {
                    var dimmerElement = element.find('.dimmer');

                    dimmerElement.dimmer({
                            closable: false,
                            duration: {
                                show : 0,
                                hide : 200
                            }
                        })
                        .dimmer('show');

                    scope.canI = {
                        edit: false
                    };
                    Session.currentUserPromise().then(function(currentUser) {
                        scope.canI.edit = CanI.edit.cheatsheet(scope.component);
                    });


                    // We do this in a timeout to make the page feel more responsive
                    // Try doing it synchronously and see how the routing freezes until the whole tree is compiled and linked
                    var compilationPromise = $timeout(function() {
                        var template = angular.element('<csf-abstract-component component="component.content" can-i="canI">');
                        element.append( template );
                        $compile(template)(scope);
                        dimmerElement.dimmer('hide');
                    }, 0);

                    scope.$on('$destroy', function() {
                        $timeout.cancel(compilationPromise);
                        dimmerElement.dimmer('destroy');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
