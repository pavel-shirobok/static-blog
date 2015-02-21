angular
  .module 'BootstrapStateCtrl',
    [
      'sbBlogData'
      'sbLoadingManager'
      'sbBlog'
    ]
  .controller 'BootstrapStateCtrl', ($scope, $timeout, sbBlogData, sbBlog, sbLoadingManager) ->
    sbLoadingManager.loadingOn();

    bootstrapApp = ()->
      sbLoadingManager.loadingOff();
      sbBlog.restorePath();

    if sbBlogData.data
      bootstrapApp()
    else
      sbBlogData.load().then bootstrapApp

    return this;