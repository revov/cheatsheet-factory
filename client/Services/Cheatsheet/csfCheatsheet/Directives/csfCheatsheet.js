angular.module('cheatsheet')
    .directive('csfCheatsheet', [
        'csfUserSettings', '$meteor', '$compile', '$timeout',
        function(csfUserSettings, $meteor, $compile, $timeout) {
            function pageDimmerHandler(scope, element, attrs) {
                var dimmerElement = element.find('.dimmer');

                dimmerElement.dimmer(
                    {
                        closable: false,
                        duration: {
                            show : 0,
                            hide : 200
                        }
                    }
                );
                dimmerElement.dimmer('show');

                //Wait until we have a resolved value for the component and compile after that
                var unregisterWatch = scope.$watch('component.type', function(newV, oldV) {
                    if(newV) {
                        unregisterWatch();

                        // We do this in a timeout to make the page feel more responsive
                        // Try doing it synchronously and see how the routing freezes until the whole tree is compiled and linked
                        $timeout(function() {
                            var template = angular.element('<ng-include src="\'client/Services/Cheatsheet/csfCheatsheet/Templates/csfMasterContainer.ng.html\'"></ng-include>');
                            element.append( template );
                            $compile(template)(scope);
                            dimmerElement.dimmer('hide');
                        }, 0);
                    }
                });

                scope.$on('$destroy', function() {
                    dimmerElement.dimmer('destroy');
                });
            }

            function rolePickerHandler(scope, element, attrs) {
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
            }

            /**
             * Get the name of the Author. TODO: Make this reactive
             */
            function userNamesSubscriptionHandler(scope, element, attrs) {
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

            function downloadButtonHandler(scope, element, attrs) {
                var downloadButton = element.find('.csf-download-button');
                downloadButton.on('mousedown', function() {
                    if(!scope.component) {return;}

                    var cheatsheetJson = JSON.stringify( Cheatsheets.findOne(scope.component._id) );
                    downloadButton.attr( 'href', 'data:application/json;charset=utf-8,' + encodeURIComponent(cheatsheetJson) );
                });
            }

            function permissionsHandler(scope, element, attrs) {
                scope.$watch(
                    'component.meta.permissions.edit',
                    function() {
                        scope.canI.edit = CanI.edit.cheatsheet(scope.component);
                    }
                );

                var computation = Tracker.autorun(function(computation) {
                    // If anything in the user changes, recalculate the permissions
                    Meteor.user();
                    scope.canI.edit = CanI.edit.cheatsheet(scope.component);
                });

                scope.$on('$destroy', function() {
                    computation.stop();
                });
            }

            function containerHandler(scope, element, attrs) {
                scope.insert = function(component, index) {
                    scope.component.content.splice(index, 0, component);
                };

                scope.remove = function(index) {
                    scope.component.content.splice(index, 1);
                };
            }

            return {
                restrict : 'E',
                templateUrl: 'client/Services/Cheatsheet/csfCheatsheet/Templates/csfCheatsheet.ng.html',
                scope: {
                    component: '='
                },
                link: function(scope, element, attrs) {
                    pageDimmerHandler(scope, element, attrs);

                    scope.canI = {
                        edit: false
                    };

                    var unregisterWatch = scope.$watch('component.type', function(newV, oldV) {
                        if(newV) {
                            unregisterWatch();
                            userNamesSubscriptionHandler(scope, element, attrs);
                        }
                    });

                    permissionsHandler(scope, element, attrs);

                    rolePickerHandler(scope, element, attrs);

                    containerHandler(scope, element, attrs);

                    downloadButtonHandler(scope, element, attrs);

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
    ]);
