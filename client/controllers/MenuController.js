angular.module('cheatsheet').controller('MenuController', [
    'Session', '$state',
    function(Session, $state) {
        this.logout = function () {
            Session.logout();
            $state.go('home');
        };
    }
]);