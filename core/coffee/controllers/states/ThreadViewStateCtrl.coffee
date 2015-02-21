angular
  .module 'ThreadViewStateCtrl',
    [
      'sbBlog'
      'sbBlogData'
      'ngRoute'
    ]
  .controller 'ThreadViewStateCtrl', (sbBlogData, sbBlog, $routeParams, $location)->
    if sbBlogData.data

    else
      sbBlog.saveRedirectPath($location.path())
      sbBlog.loadingState()
    return this