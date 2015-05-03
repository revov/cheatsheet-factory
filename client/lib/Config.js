angular.module('cheatsheet')
    .config([
        '$compileProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider',
        function( $compileProvider, $urlRouterProvider, $stateProvider, $locationProvider ){
            $compileProvider.debugInfoEnabled(false);

            $locationProvider.html5Mode(true);

            // Underscore.js is deprecated since Meteor 1.1 (on a side note, lodash is better)
            _ = lodash;

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
                .state('register', {
                    url: '/register',
                    templateUrl: 'client/views/partials/register.ng.html',
                    controller: 'RegisterController',
                    controllerAs: 'register'
                })
                .state('forgotten-password', {
                    url: '/forgotten-password',
                    templateUrl: 'client/views/partials/forgotten-password.ng.html',
                    controller: 'ForgottenPasswordController',
                    controllerAs: 'forgottenPassword'
                })
                .state('reset-password', {
                    url: '/reset-password/:id',
                    templateUrl: 'client/views/partials/reset-password.ng.html',
                    controller: 'ResetPasswordController',
                    controllerAs: 'resetPassword'
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
                })
                .state('view-cheatsheet', {
                    url: '/cheatsheet/view/:id',
                    templateUrl: 'client/views/partials/view-cheatsheet.ng.html',
                    controller: 'ViewCheatsheetController',
                    controllerAs: 'viewCheatsheet'
                })
                .state('dev', {
                    url: '/dev',
                    templateUrl: 'client/views/partials/dev.ng.html',
                    controller: 'DevController',
                    controllerAs: 'dev'
                });

            $urlRouterProvider.otherwise("/");
        }]);