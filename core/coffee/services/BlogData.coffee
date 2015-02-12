angular
  .module 'BlogData', []
  .service 'BlogData', ($http, $q) ->
    self = this;
    data = undefined;

    contentDir = 'content'

    dataPromise = $http
      .get [contentDir, 'blogDescriptor.json'].join('/')
      .then (d)->
        data = d.data;

        postDataProcessing data

    postDataProcessing = (data)->
      console.log data
      injectDataToPosts data
      loadTree data.tree, data
      return data

    injectDataToPosts = (data)->
      $(data.posts).each (i, post)->
        post.image = ((fileName)->
          self.getImagePath(this, fileName)).bind(post);
        post.url = self.getPostUrl post
        post.date = (new Date(post.directory[0], post.directory[1], post.directory[2])).getTime();
      return data

    loadTree = (root, data) ->
      if _.isArray root
        _.each root, (indexFromTree, itemIndex)->
          root[itemIndex] = data.posts[indexFromTree];
      else
        _.each root, (value, key)->
          loadTree root[key], data


    this.getPosts = () ->
      if data?
        $q((resolve)-> resolve data )
      else
        dataPromise

    this.getPostUrl = (post)->
      [contentDir, post.directory[0], post.directory[1], post.postFileName + '.html'].join('/')

    this.getImagePath = (post, imageFileName)->
      [contentDir, post.directory[0], post.directory[1], imageFileName].join('/')

    return this