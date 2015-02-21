angular
  .module 'sbView', ['ngRoute']
  .directive 'sbView', ()->
    replace : false
    template : '<div ng-view></div>'