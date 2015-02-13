angular
  .module 'sbHeader', []
  .directive 'sbHeader', ()->
    replace : false
    scope :
      blogName : '@'
    templateUrl : 'templates/sb-header.html',
    controller : ($scope)->
      #TODO extract controller to separate module
      console.log $scope.blogName
