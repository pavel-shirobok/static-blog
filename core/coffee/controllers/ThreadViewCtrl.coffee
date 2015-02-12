angular
  .module 'ThreadViewCtrl', ['BlogData']
  .controller 'ThreadViewCtrl', ($scope, BlogData)->
    BlogData
      .getPosts()
      .then (data)->
        $scope.posts = data.posts;