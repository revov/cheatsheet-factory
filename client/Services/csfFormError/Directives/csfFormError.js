/*
 * Usage:
 * $scope.$broadcast('notification', {type: 'info', msg:'This is ' + type + ' and it can be long message why not'});
 */
angular.module('cheatsheet')
    .directive('csfFormError', function() {
        return {
            restrict : 'E',
            templateUrl: 'client/Services/csfFormError/Templates/csfFormError.ng.html',
            replace: true,
            scope: {
                errorMessage: '=',
                state: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('state', function(newVal, oldVal){
                    element.parent('.ui.form:first')
                        .removeClass('error warning loading')
                        .addClass(newVal);
                });
            }
        };
    });