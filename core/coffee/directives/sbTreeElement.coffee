angular
  .module 'sbTreeElement', ['BlogData', 'Blog']
  .directive 'sbTreeElement', ()->
    replace : false
    restrict : 'E'
    templateUrl : 'templates/sb-tree-element.html'
    scope :
      type : '@'
      path : '@'
    controller : ($scope, $element, Blog, BlogData, $compile)->
      #console.log('test', $element, angular.element('<div>'));
      #TODO refactoring
      #TODO extract controller to separate module



      BlogData
        .getPosts()
        .then (data) ->
          if $scope.path == '/'
            path = []
          else
            path = $scope.path.split('/');


          $scope.onClick = ()->

            if $scope.post
              #console.log $scope.post
              Blog.openPost($scope.post)


          if path.length == 3
            $scope.post = BlogData.getRoot(data.tree, path)
            $scope.label = $scope.post.postName

          else
            if path.length == 0
              $scope.label = '/'
            else
              $scope.label = path[path.length - 1];

            _.each BlogData.getRoot(data.tree, path), (value, key)->
              temp_path = path.concat key
              #console.log $scope.path , path, temp_path
              #obj = BlogData.getRoot(data.tree, temp_path)

              sb = angular.element('<sb-tree-element>')
              sb.attr 'path', temp_path.join '/'
              #if $scope.post
              #sb.attr 'post', $scope.post?'post':undefined
              #sb.text key
              $element.find('.wrapper').append(sb[0])
              #if path.length == 1 then return
              $compile(sb[0])($scope);

              #console.log(obj)

          #$scope.label = path[path.length-1]

          #if path.length < 3