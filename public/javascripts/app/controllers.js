// Main

app.controller('AppCtrl', ['$scope', function ($scope)
{
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



  $scope.showAlert('success', ['Congratz! bro', 'tu pues du fion']);
}]);



// User list

app.controller('UsersCtrl', ['$scope', function ($scope)
{
}]);



// Single user

app.controller('UserCtrl', ['$scope', function ($scope)
{
}]);