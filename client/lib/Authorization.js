angular.module('cheatsheet')
    .run([
        '$rootScope', '$state', 'Session',
        function($rootScope, $state, Session) {
            /***************
             * Authorization
             **************/
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if( Meteor.loggingIn() ) {
                        //Our Meteor.user() is loaded asynchronously so we need to wait till it is resolved to continue
                        event.preventDefault();
                        Session.currentUserPromise().then(
                            function() {
                                $state.go(toState, toParams);
                            }
                        );
                    } else {
                        if( !CanI.viewPage(toState.name) ) {
                            event.preventDefault();
                            $state.go('403');
                        }
                    }
                });

            // TODO: Optimize this. Poor performance as CanI checks will be called on each digest cycle
            $rootScope.CanI = CanI;
        }
    ]);