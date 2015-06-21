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
                replace: true,
                scope: {},
                link: function(scope, element, attrs) {
                    toastr.options.showEasing = 'swing';
                    toastr.options.hideEasing = 'swing';
                    toastr.options.showMethod = 'slideDown';
                    toastr.options.hideMethod = 'slideUp';
                    toastr.options.timeOut = 10000;
                    toastr.options.showDuration = 150;
                    toastr.options.hideDuration = 300;

                    scope.$on("notificationReceived", function (event, notification) {
                        toastr[notification.type](notification.message, notification.header);
                    });
                }
            };
        }
    ]);