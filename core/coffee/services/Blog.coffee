angular
  .module 'Blog', ['BlogData']
  .service 'Blog', ($q, BlogData, $rootScope)->
    data = undefined

    defer = $q.defer()
    defer.promise.then angular.noop

    BlogData.getPosts().then (d)->
      data = d;
      defer.resolve();

    this.openPost = (post)->
      defer.promise.then ()->
        console.log 'Opening post', post.postName

      if data then defer.resolve()

    return this;