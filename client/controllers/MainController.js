angular.module('cheatsheet').controller('MainController', [
    '$scope',
    function($scope) {
        /***************
         * Layout
         **************/
        $('.ui.sticky')
            .sticky({
                context: '#main-viewport'
            })
        ;
    }
]);