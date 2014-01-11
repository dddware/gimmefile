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

    .when('/new', {
      pageTitle: 'Nouvel utilisateur',
      templateUrl: '/partials/form.html',
      controller: 'NewUserCtrl'
    })

    .when('/:id', {
      pageTitle: 'Voir l\'utilisateur',
      templateUrl: '/partials/user.html',
      controller: 'UserCtrl'
    })

    .when('/:id/edit', {
      pageTitle: 'Modifier l\'utilisateur',
      templateUrl: '/partials/form.html',
      controller: 'EditUserCtrl'
    })

    .otherwise({
      redirectTo: '/users'
    });
}]);