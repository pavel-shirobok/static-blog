angular
  .module 'ThreadViewStateCtrl',
    [
      'sbBlog'
      'sbBlogData'
      'ngRoute'
      'sbPaginationControl'
    ]
  .controller 'ThreadViewStateCtrl', ($scope, sbBlogData, sbBlog, $routeParams, $location)->
    if sbBlogData.data
      $scope.paginationModel = sbBlog.paginationModel(parseInt($routeParams.pageIndex));

      $scope.$watch 'paginationModel.page', (newValue, oldValue) ->
        if newValue != oldValue
          sbBlog.openPage newValue

    else
      sbBlog.saveRedirectPath($location.path())
      sbBlog.loadingState()
    return this