angular
  .module 'sbSpinner', [ ]
  .directive 'sbSpinner', ()->
    replace : false
    restrict : 'E'
    templateUrl : 'templates/sb-spinner.html'
    scope :  { size : '@' }
    controller : ($scope, $element)->
      update = ()->$element.css(fontSize : $scope.size)
      update()
      $scope.$watch 'size', update
      #TODO extract controller to separate module