angular
  .module 'sbPost', ['sbCut', 'sbImg', 'sbCode', 'sbPostHeader']
  .directive 'sbPost', ()->
    replace : false
    scope :
      post    : '='
      isShort : '='
    templateUrl : 'templates/sb-post.html'