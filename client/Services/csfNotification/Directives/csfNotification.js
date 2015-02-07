/*
 * Usage:
 * $scope.$broadcast('notification', {type: 'info', msg:'This is ' + type + ' and it can be long message why not'});
 */
angular.module('cheatsheet')
    .directive('csfNotification', [
        '$timeout',
        function($timeout) {
            return {
                restrict : 'E',
                templateUrl : 'client/Services/csfNotification/Templates/csfNotification.tpl',
                replace: true,
                scope: {},
                link: function(scope, element, attrs) {
                    var fadeOutPromise;

                    var hideImmediately = function() {
                            $timeout.cancel(fadeOutPromise);
                            element.transition('fade down out', 0);
                        },
                        show = function() {
                            element.transition('fade down in', 500);
                        },
                        hideAfter = function( miliseconds ) {
                            fadeOutPromise = $timeout( function() {
                                element.transition('fade down out', 500);
                            }, miliseconds);
                        };

                    // Initially we would like to hide the message
                    hideImmediately();

                    scope.$on("notificationReceived", function (event, notification) {
                        hideImmediately();

                        scope.notification = notification;

                        show();
                        hideAfter(5000);
                    });

                    element.on('click', function() {
                        hideImmediately();
                    });

                    element.on('$destroy', function() {
                        $timeout.cancel(fadeOutPromise);
                    });
                }
            };
        }
    ]);