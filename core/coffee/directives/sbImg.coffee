angular
.module 'sbImg', ['BlogData']
.directive 'sbImg', ()->
  replace : false
  scope:
    post : '='
    alt : '@'
    fileName : '@src'
    title : '@'
  templateUrl : 'templates/sb-img.html'
  controller : ($scope, BlogData)->
    $scope.src = BlogData.getImagePath($scope.post, $scope.fileName);