app.factory('User', function ($resource) {
  return $resource('/users/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});

app.factory('HttpErrorInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
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
}]);