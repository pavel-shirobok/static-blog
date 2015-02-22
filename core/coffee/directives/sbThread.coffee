angular
.module 'sbThread', ['sbThreadCtrl', 'sbPaginationFilter', 'sbPost']
.directive 'sbThread', ()->
  replace : false
  scope :
    current : '='
    total   : '='
    ppp     : '='
  templateUrl : 'templates/sb-thread.html'
  controller : 'sbThreadCtrl'
