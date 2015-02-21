angular
.module 'sbCutCtrl', ['sbBlog']
.controller 'sbCutCtrl', ($scope, $element, sbBlog)->
  if $scope.isShort
    $element.nextAll().remove();
  else
    $element.remove();
  $scope.open = sbBlog.openPost