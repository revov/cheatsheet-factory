angular.module('cheatsheet')
    .directive('csfCheatsheet', [
        'csfUserSettings', '$compile', '$timeout', '$meteor',
        function(csfUserSettings, $compile, $timeout, $meteor) {
            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatsheet/Templates/csfCheatsheet.ng.html',
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

                    var compilationPromise;
                    function render() {
                        // We do this in a timeout to make the page feel more responsive
                        // Try doing it synchronously and see how the routing freezes until the whole tree is compiled and linked
                        compilationPromise = $timeout(function() {
                            var template = angular.element('<div ng-repeat="item in component.content"><csf-abstract-component component="item" can-i="canI"></div>');
                            element.append( template );
                            $compile(template)(scope);
                            dimmerElement.dimmer('hide');
                        }, 0);

                        // Get the name of the Author. TODO: Make this reactive
                        $meteor.subscribe('user-names', [scope.component.meta.userId])
                            .then(function(value) {
                                var authorSubscriptionHandle = value;

                                var author = Meteor.users.findOne(scope.component.meta.userId);
                                if(author) {
                                    scope.authorName = author.profile.firstName + ' ' + author.profile.lastName;
                                }
                                authorSubscriptionHandle.stop();
                            });
                    }

                    //Wait until we have a resolved value for the component and compile after that
                    var unregisterWatch = scope.$watch('component.type', function(newV, oldV) {
                        if(newV) {
                            unregisterWatch();
                            render();
                        }
                    });

                    scope.$watch(
                        'component.meta.permissions.edit',
                        function() {
                            scope.canI.edit = CanI.edit.cheatsheet(scope.component);
                        }
                    );

                    /**
                     * Role picker fancy logic
                     */
                    scope.onEditPermissionAdded = function(role) {
                        if( !_.contains(scope.component.meta.permissions.view, role) ) {
                            scope.component.meta.permissions.view.push(role);
                        }
                    };

                    scope.onViewPermissionRemoved = function(role) {
                        if( _.contains(scope.component.meta.permissions.edit, role) ) {
                            var index = scope.component.meta.permissions.edit.indexOf(role);
                            scope.component.meta.permissions.edit.splice(index, 1);
                        }
                    };

                    /**
                     * Cleanup
                     */
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
