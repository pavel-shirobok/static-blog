angular
  .module 'Blog', ['BlogData']
  .service 'Blog', ($q, BlogData, $location, $rootScope)->
    $rootScope.currentPage = 0
    $rootScope.postsOnPage = 2;
    $rootScope.totalPages = 0;

    data = undefined

    defer = $q.defer()
    defer.promise.then angular.noop

    BlogData.getPosts().then (d)->
      data = d;
      $rootScope.totalPages = Math.ceil(data.posts.length / $rootScope.postsOnPage);
      defer.resolve();

    this.openPost = (post)->
      defer.promise.then ()->
        query = post.directory.concat(post.postFileName)
        $location.path(query.join('/'));

      if data then defer.resolve()

    this.getPost = (year, month, day, name)->
      return defer.promise.then ()->
        return BlogData.getRoot(data.tree, [year, month, day + '-' + name])


      if data then defer.resolve()

    this.setCurrentPage = (pageNumber) -> $rootScope.currentPage = pageNumber ;

    this.nextPage = () -> $location.path( '/page' + ($rootScope.currentPage + 1) );
    this.prevPage = () -> $location.path( '/page' + ($rootScope.currentPage - 1) );

    return this;