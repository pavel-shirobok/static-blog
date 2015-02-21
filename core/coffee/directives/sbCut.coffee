angular
.module 'sbCut', ['sbCutCtrl']
.directive 'sbCut', ->
  replace : false
  scope:
    isShort : '='
    post : '='
  templateUrl : 'templates/sb-cut.html'
  controller : 'sbCutCtrl'