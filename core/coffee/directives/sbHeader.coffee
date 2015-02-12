angular
  .module 'sbHeader', []
  .directive 'sbHeader', ()->
    replace : false
    scope :
      blogName : '@'
    templateUrl : 'templates/sb-header.html',
    controller : ($scope)->
      console.log $scope.blogName
