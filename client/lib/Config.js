angular.module('cheatsheet')
    .config([
        '$urlRouterProvider', '$stateProvider', '$locationProvider',
        function( $urlRouterProvider, $stateProvider, $locationProvider ){
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'client/views/partials/home.tpl',
                    controller: 'HomeController',
                    controllerAs: 'home'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'client/views/partials/login.tpl',
                    controller: 'LoginController',
                    controllerAs: 'login'
                })
                .state('403', {
                    url: '/403',
                    templateUrl: 'client/views/partials/403.tpl'
                })
                .state('cheatsheet', {
                    url: '/cheatsheet',
                    templateUrl: 'client/views/partials/cheatsheet.tpl',
                    controller: 'CheatsheetController',
                    controllerAs: 'cheatsheet'
                });

            $urlRouterProvider.otherwise("/");
        }]);