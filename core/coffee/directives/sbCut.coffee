angular
.module 'sbCut', ['Blog']
.directive 'sbCut', ()->
  replace : false
  scope:
    isShort : '='
    post : '='
  templateUrl : 'templates/sb-cut.html'
  controller : ($scope, $element, Blog)->
    #TODO extract controller to separate module
    if $scope.isShort
      $element.nextAll().remove();
    else
      $element.remove();
    $scope.open = Blog.openPost