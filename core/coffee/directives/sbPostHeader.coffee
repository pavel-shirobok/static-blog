angular
  .module 'sbPostHeader', ['sbBlog']
  .directive 'sbPostHeader', ->
    scope :
      post : '='
      isLink : '='
    controller : ($scope, $element, sbBlog)->
      $element.removeClass('link');
      if $scope.isLink
        $element
          .addClass 'link'
          .click ->
            sbBlog.openPost $scope.post
            console.log('open', $scope.post.postFileName)
