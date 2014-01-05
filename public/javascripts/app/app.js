var app = angular.module('gimmefile', ['ngRoute', 'ngResource']);

app.config(['$locationProvider', '$httpProvider', '$routeProvider', function ($locationProvider, $httpProvider, $routeProvider)
{
  $locationProvider.hashPrefix('!');
  $httpProvider.interceptors.push('HttpErrorInterceptor');

  $routeProvider
    .when('/', {
      pageTitle: 'Utilisateurs',
      templateUrl: '/partials/users.html',
      controller: 'UsersCtrl'
    })

    .when('/:id', {
      pageTitle: 'Ajouter un utilisateur',
      templateUrl: '/partials/user.html',
      controller: 'UserCtrl'
    })

    .otherwise({
      redirectTo: '/users'
    });
}]);