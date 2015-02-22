angular
  .module 'sbPaginationControlCtrl', []
  .controller 'sbPaginationControlCtrl', ($scope)->
    $scope.next = -> $scope.current++
    $scope.prev = -> $scope.current--
    $scope.canNext = ()-> $scope.current < $scope.total - 1
    $scope.canPrev = ()-> $scope.current > 0