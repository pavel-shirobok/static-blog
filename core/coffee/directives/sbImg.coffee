angular
.module 'sbImg', ['BlogData']
.directive 'sbImg', ()->
  replace : false
  scope:
    post : '='
    alt : '@'
    src : '@'
    title : '@'
  templateUrl : 'templates/sb-img.html'
  controller : ($scope, BlogData)->
    angular.noop()