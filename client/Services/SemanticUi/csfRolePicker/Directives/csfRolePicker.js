angular.module('cheatsheet')
    .directive('csfRolePicker', [
        '$meteor',
        function($meteor) {
            return {
                restrict : 'E',
                replace: true,
                templateUrl: 'client/Services/SemanticUi/csfRolePicker/Templates/csfRolePicker.ng.html',
                scope: {
                    roles: '=',
                    onAdded: '&',
                    onRemoved: '&'
                },
                link: function(scope, element, attrs) {
                    var rolesPromise = $meteor.subscribe('user-roles');
                    var rolesSubscriptionHandle;
                    var dropdownElement = element.find('.ui.dropdown');

                    rolesPromise.then(function(value) {
                        rolesSubscriptionHandle = value;
                        scope.possibleRoles = Meteor.roles.find().fetch();
                        dropdownElement.dropdown({
                            action: function(text, value) {
                                if( !_.contains(scope.roles, value) ) {
                                    scope.$apply(function() {
                                        scope.roles.push(value);
                                        scope.onAdded({role: value});
                                    });
                                }
                                dropdownElement.dropdown('hide');
                            }
                        });
                    });

                    scope.removeRole = function(role) {
                        var index = scope.roles.indexOf(role);
                        scope.roles.splice(index, 1);
                        scope.onRemoved({role: role});
                    };

                    scope.$on('$destroy', function() {
                        rolesSubscriptionHandle.stop();
                        dropdownElement.dropdown('destroy');
                    });

                    element.on('$destroy', function() {
                        scope.$destroy();
                    });
                }
            };
        }
    ]);
