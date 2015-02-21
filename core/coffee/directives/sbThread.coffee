angular
.module 'sbThread', ['sbPost', 'sbBlogData', 'sbPaginationFilter']
.directive 'sbThread', ()->
  replace : false
  templateUrl : 'templates/sb-thread.html'
  controller : ($scope, sbBlogData)->
    if sbBlogData.data
      $scope.posts = sbBlogData.data.posts

#TODO extract controller to separate module