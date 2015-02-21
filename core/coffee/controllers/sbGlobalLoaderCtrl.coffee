angular
  .module 'sbGlobalLoaderCtrl',
  [
    'sbLoadingManager'
  ]
  .controller 'sbGlobalLoaderCtrl', ($scope, $element, sbLoadingManager) ->
    initial = $element.css 'display'

    observable =
      show : (state)->
        $scope.loading = state
        observable

    $scope
      .$watch 'loading', ()->
        $element.css 'display', if($scope.loading) then initial else 'none'

    observable.show false
    sbLoadingManager.observe observable