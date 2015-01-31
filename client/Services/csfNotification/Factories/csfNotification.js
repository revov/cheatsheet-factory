angular.module('cheatsheet')
    .factory('csfNotification', [
        '$rootScope',
        function($rootScope) {
            return {
                show: function(type, header, message) {
                    $rootScope.$broadcast("notificationReceived", {type: type, header: header, message: message});
                }
            };
        }
    ]);
