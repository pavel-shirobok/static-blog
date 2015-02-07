angular.module('StaticBlogApp', ['ngRoute', 'EntryPointController']);

angular.module('EntryPointController', []).controller('EntryPointController', function($scope) {
  return $scope.message = '';
});
