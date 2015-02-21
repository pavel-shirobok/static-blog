angular
  .module 'sbHeader', ['sbBlog', 'sbHeaderCtrl']
  .directive 'sbHeader', ()->
    replace : false
    scope :
      blogName : '@'
    templateUrl : 'templates/sb-header.html',
    controller : 'sbHeaderCtrl'
