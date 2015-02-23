angular
  .module 'sbPost', ['sbCut', 'sbImg', 'sbCode']
  .directive 'sbPost', ()->
    replace : false
    scope :
      post    : '='
      isShort : '='
    templateUrl : 'templates/sb-post.html'