angular
  .module 'sbTreeElement', ['sbTreeElementCtrl']
  .directive 'sbTreeElement', ()->
    replace : false
    restrict : 'E'
    templateUrl : 'templates/sb-tree-element.html'
    scope :
      type : '@'
      path : '@'
    controller : "sbTreeElementCtrl"