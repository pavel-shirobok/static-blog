angular
  .module 'Blog', ['BlogData']
  .service 'Blog', ($q, BlogData, $location)->
    data = undefined

    defer = $q.defer()
    defer.promise.then angular.noop

    BlogData.getPosts().then (d)->
      data = d;
      defer.resolve();

    this.openPost = (post)->
      defer.promise.then ()->
        query = post.directory.concat();
        query[query.length - 1] = post.postFileName;
        $location.path(query.join('/'));

      if data then defer.resolve()

    this.getPost = (year, month, day, name)->
      return defer.promise.then ()->
        query = [year, month, day + '-' + name];
        _.find(
          data.posts,
          (post)->
            post_q = post.directory.concat();
            post_q[post_q.length-1] = post.postFileName
            return _.isEqual(query, post_q)
        )

      if data then defer.resolve()

    return this;