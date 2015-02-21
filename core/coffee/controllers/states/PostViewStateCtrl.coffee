angular
  .module 'PostViewStateCtrl',
    [
      'ngRoute'
      'sbBlog'
      'sbBlogData'
    ]
  .controller 'PostViewStateCtrl', ($scope, sbBlog, sbBlogData, $location, $routeParams) ->
    if sbBlogData.data
      $scope.post = sbBlog.getPostByPath $routeParams.year, $routeParams.month, $routeParams.name
    else
      sbBlog.saveRedirectPath $location.path()
      sbBlog.loadingState()

    return this;