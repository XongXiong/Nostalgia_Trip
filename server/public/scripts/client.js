let myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages',]);

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'PostController as pc',
    })
    .when('/add', {
      templateUrl: '/views/templates/add.html',
      controller: 'PostController as pc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
    })
    .when('/editUser', {
      templateUrl: '/views/templates/editUser.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
