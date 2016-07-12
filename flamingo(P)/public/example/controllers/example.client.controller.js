angular.module('example').controller('ExampleController',['$scope','Authentication',
  function($scope,Authentication){
    // $scope.name = Authentication ? Authentication.user.fullName : 'MEAN APPLICATION';
    $scope.authentication = Authentication;
  }
]);
