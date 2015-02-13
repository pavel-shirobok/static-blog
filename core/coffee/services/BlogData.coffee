angular
  .module 'BlogData', []
  .service 'BlogData', ($http, $q) ->
    self = this;
    data = undefined;
    #todo refactor
    contentDir = 'content'

    dataPromise = $http
      .get [contentDir, 'blogDescriptor.json'].join('/')
      .then (d)->
        data = postDataProcessing d.data;
        return data

    postDataProcessing = (data)->
      injectDataToPosts data
      loadTree data.tree, data
      return data

    injectDataToPosts = (data)->
      $(data.posts).each (i, post)->
        post.image = ((fileName)->
          self.getImagePath(this, fileName)).bind(post);
        post.url = self.getPostUrl post
        post.date = (new Date(post.date)).getTime();
        console.log(new Date(post.date))
      return data

    loadTree = (root, data) ->
      _.each root, (value, key)->
        if _.isNumber value
          root[key] = data.posts[value];
        else
          loadTree value, data


    this.getPosts = () ->
      if data?
        $q((resolve)-> resolve data )
      else
        dataPromise

    this.getPostUrl = (post)->
      [contentDir].concat(post.directory, post.postFileName + '.html').join('/')

    this.getImagePath = (post, imageFileName)->
      [contentDir, post.directory[0], post.directory[1], imageFileName].join('/')

    this.getRoot = ( root, path )->
      path = path.concat()
      if path.length == 0
        return root
      if path.length == 1
        return root[path[0]]
      else
        return this.getRoot(root[path.shift()], path)

    return this