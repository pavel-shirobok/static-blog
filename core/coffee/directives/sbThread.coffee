angular
.module 'sbThread', ['sbPost', 'BlogData']
.directive 'sbThread', ()->
  replace : false
  templateUrl : 'templates/sb-thread.html'
  controller : ($scope, BlogData)->
    BlogData.getPosts().then (data)->
      $scope.posts = data.posts