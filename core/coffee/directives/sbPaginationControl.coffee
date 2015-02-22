angular
  .module 'sbPaginationControl', ['sbPaginationControlCtrl']
  .directive 'sbPaginationControl', ()->
    replace : false
    scope :
      total : '='
      current : '='
    templateUrl : 'templates/sb-pagination-control.html'
    controller : 'sbPaginationControlCtrl'