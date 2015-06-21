/*
 * Usage:
 * $scope.$broadcast('notification', {type: 'info', msg:'This is ' + type + ' and it can be long message why not'});
 */
angular.module('cheatsheet')
    .directive('csfAvatar', [
        '$timeout',
        function($timeout) {
            return {
                restrict : 'E',
                template : '<img/>',
                scope: {
                    userId: '@'
                },
                link: function(scope, element, attrs) {
                    var $imgElement = element.find('img:first');

                    var computation = Tracker.autorun(function() {
                        var sub = Meteor.subscribe('avatars', [scope.userId]);
                        if(!sub.ready()) {
                            return;
                        }
                        var avatar = Avatars.findOne({userId:scope.userId});
                        if( avatar ) {
                            $imgElement.attr('src', avatar.url());
                        } else {
                            $imgElement.attr('src', 'img/anonymous-user.png');
                        }
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