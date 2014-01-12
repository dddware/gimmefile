(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports =
{
  // Main

  'AppCtrl': ['$scope', 'User', function ($scope) {
    $scope.$on('$routeChangeSuccess', function(e, current) {
      $scope.pageTitle = current.pageTitle;
    });

    $scope.showAlert = function(type, message) {
      $scope.alert = {
        type: type,
        message: message,
        multiple: message instanceof Array
      };
    };

    $scope.hideAlert = function() {
      $scope.alert = null;
    };

    /*$scope.$on('$routeChangeStart', function() {
      $scope.closeAlert();
    });

    $scope.$on('httpError', function (e, error) {
      var message = error.message || error;
      $scope.showAlert('error', message);
    });*/



    //$scope.showAlert('success', ['Congratz! bro', 'tu pues du fion']);
  }]



  // User list

, 'UsersCtrl': ['$scope', 'User', function ($scope, User) {
    $scope.users = User.query();
  }]



  // User creation

, 'NewUserCtrl': ['$scope', '$location', 'User', function ($scope, $location, User) {
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.save = function() {
      var user = new User($scope.user);

      user.$save();
      // ? récupérer l'id et rediriger avec $location.path('/' + id);
    };
  }]



  // User display

, 'UserCtrl': ['$scope', '$routeParams', '$location', 'User', function ($scope, $routeParams, $location, User) {
    $scope.user = User.get({ id: $routeParams.id }, function () {
      $scope.destroy = function() {
        $scope.user.$remove();
        $location.path('/');
      };
    });
  }]



  // User modification

, 'EditUserCtrl': ['$scope', '$routeParams', 'User', function ($scope, $routeParams, User) {
    $scope.user = User.get({ id: $routeParams.id }, function () {
      $scope.save = function() {
        $scope.user.$update();
      };
    });
  }]
};

},{}],2:[function(require,module,exports){
'use strict';

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
},{"./controllers":1,"./services":3}],3:[function(require,module,exports){
'use strict';

module.exports =
{
  'User': function ($resource) {
    return $resource('/users/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  }

, 'HttpErrorInterceptor': ['$rootScope', '$q', function ($rootScope, $q) {
    return {
      'response': function(response) {
        if (response.data && response.data.error) {
          $rootScope.$broadcast('httpError', response.data.error);
          return $q.reject(response);
        }

        return response;
      }/*,

      'responseError': function(rejection) {
        // see http://stackoverflow.com/questions/11971213/error-401-handling-with-angularjs#answer-18764801
      }*/
    };
  }]
};

},{}]},{},[2])