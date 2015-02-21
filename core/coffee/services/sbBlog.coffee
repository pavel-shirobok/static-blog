angular
  .module 'sbBlog', ['sbBlogData']
  .service 'sbBlog', ($q, sbBlogData, $location, $rootScope)->
    self = this;

    self.loadingState = -> $location.path('loading');

    self.toMain = -> self.openPage(0)

    self.openPage = (index) ->  $location.path('page' + index)

    self.saveRedirectPath = (@path)->

    self.restorePath = () ->
      if self.path && self.path!='/loading'
        $location.path(self.path)
      else
        self.toMain();

    self.openPost = (post) -> $location.path(post.directory.concat(post.postFileName).join('/'))

    self.getPostByPath = (year, month, name)-> sbBlogData.getRoot(sbBlogData.data.tree, [year, month, name])

    return this;