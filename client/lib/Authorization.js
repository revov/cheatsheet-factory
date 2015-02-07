angular.module('cheatsheet')
    .run([
        '$rootScope',
        function($rootScope) {
            /***************
             * Authorization
             **************/
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if( !CanI.viewPage(toState.name) ) {
                        event.preventDefault();
                        $state.go('403');
                    }
                });

            // TODO: Optimize this. Poor performance as CanI checks will be called on each digest cycle
            $rootScope.CanI = CanI;
        }
    ]);