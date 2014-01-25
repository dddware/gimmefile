/* jshint -W097 */
'use strict';

require('angular/angular');
require('angular-route/angular-route');
require('angular-resource/angular-resource');

var controllers = require('./controllers')
  , services = require('./services')

  , app = angular.module('gimmefile', ['ngRoute', 'ngResource'])
    .config(['$locationProvider', '$httpProvider', '$routeProvider', function ($locationProvider, $httpProvider, $routeProvider) {
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



for (var name in controllers) {
  app.controller(name, controllers[name]);
}

for (var name in services) {
  app.factory(name, services[name]);
}