angular.module('cheatsheet')
    .config([
        '$compileProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider',
        function( $compileProvider, $urlRouterProvider, $stateProvider, $locationProvider ){
            $compileProvider.debugInfoEnabled(false);

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'client/views/partials/home.ng.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'client/views/partials/login.ng.html',
                    controller: 'LoginController',
                    controllerAs: 'login'
                })
                .state('403', {
                    url: '/403',
                    templateUrl: 'client/views/partials/403.ng.html'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'client/views/partials/admin.ng.html',
                    controller: 'AdminController',
                    controllerAs: 'admin'
                })
                .state('cheatsheet', {
                    url: '/cheatsheet',
                    templateUrl: 'client/views/partials/cheatsheet.ng.html',
                    controller: 'CheatsheetController',
                    controllerAs: 'cheatsheet'
                });

            $urlRouterProvider.otherwise("/");
        }]);