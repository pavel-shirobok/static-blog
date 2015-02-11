angular
  .module 'BlogData', []
  .service 'BlogData', ($http, $q) ->
    #self = this;
    data = undefined;

    contentDir = 'content'

    dataPromise = $http
      .get [contentDir, 'blogDescriptor.json'].join('/')
      .then (d)->
        data = d.data;
        $(data.posts).each (i, post)->
          post.date = (new Date(post.directory[0], post.directory[1], post.directory[2])).getTime();
        return data

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