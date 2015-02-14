angular
  .module 'sbHeader', ['Blog']
  .directive 'sbHeader', ()->
    replace : false
    scope :
      blogName : '@'
    templateUrl : 'templates/sb-header.html',
    controller : ($scope, Blog)->
      $scope.openPage = ()->
        Blog.openPage(0)
      #TODO extract controller to separate module
      #console.log $scope.blogName
