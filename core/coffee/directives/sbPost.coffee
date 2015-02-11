angular
  .module 'sbPost', ['sbCut', 'sbImg']
  .directive 'sbPost', ()->
    replace : false
    scope :
      post    : '='
      isShort : '='
    templateUrl : 'templates/sb-post.html'
    controller : ($scope, BlogData)->
      $scope.post.url = BlogData.getPostUrl $scope.post