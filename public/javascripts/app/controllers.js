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
