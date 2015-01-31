angular.module('cheatsheet')
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){
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
                });

            $urlRouterProvider.otherwise("/");
        }]);;