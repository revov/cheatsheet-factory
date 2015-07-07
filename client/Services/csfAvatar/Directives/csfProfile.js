angular.module('cheatsheet')
    .directive('csfProfile', [
        '$timeout',
        function($timeout) {
            return {
                restrict : 'E',
                templateUrl : 'client/Services/csfAvatar/Templates/csfProfile.ng.html',
                scope: {
                    userId: '@'
                },
                link: function(scope, element, attrs) {
                    var computation = Tracker.autorun(function() {
                        var sub = Meteor.subscribe('user-names', [scope.userId]);
                        if(!sub.ready()) {
                            return;
                        }
                        scope.userInfo = Meteor.users.findOne({_id: scope.userId});
                        scope.$applyAsync();
                    });

                    scope.$watch('userId', function() {
                        computation.invalidate();
                    });

                    /**
                     * Cleanup
                     */
                    scope.$on('$destroy', function() {
                        computation.stop();
                    });
                }
            };
        }
    ]);