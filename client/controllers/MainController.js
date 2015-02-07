angular.module('cheatsheet').controller('MainController', [
    '$scope',
    function($scope) {
        $('.ui.sticky')
            .sticky({
                context: '#main-viewport'
            })
        ;
    }
]);