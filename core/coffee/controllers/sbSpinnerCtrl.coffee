angular
  .module "sbSpinnerCtrl", []
  .controller "sbSpinnerCtrl", ($scope, $element)->
    update = ()->$element.css(fontSize : $scope.size)
    $scope.$watch 'size', update