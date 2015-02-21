angular
  .module "sbTreeElementCtrl", ["sbBlog", "sbBlogData"]
  .controller "sbTreeElementCtrl", ($scope, $element, sbBlog, sbBlogData, $compile)->
    $scope.onClick = ()->
      if $scope.post then sbBlog.openPost($scope.post)

    createTree = ()->
      if $scope.path == '/'
        path = []
      else
        path = $scope.path.split '/'

      if path.length == 3
        # leaf = post link
        $scope.post = sbBlogData.getRoot sbBlogData.data.tree, path
        $scope.label = $scope.post.postName
      else
        if path.length == 0
          $scope.label = '/' # root
        else
          $scope.label = path[path.length - 1] # month or year

        _
          .each sbBlogData.getRoot(sbBlogData.data.tree, path), (value, key)->
            temp_path = path.concat key
            newTreeElement = angular
              .element '<sb-tree-element>'
              .attr 'path', temp_path.join '/'
              .appendTo $element.find '.wrapper'
            $compile(newTreeElement)($scope)

    sbBlogData
      .load()
      .then createTree
    return this