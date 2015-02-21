angular
.module 'sbImg', ['sbBlogData']
.directive 'sbImg', ()->
  replace : false
  scope:
    post : '='
    alt : '@'
    src : '@'
    title : '@'
  templateUrl : 'templates/sb-img.html'