angular
  .module 'sbPaginationControl', ['Blog']
  .directive 'sbPaginationControl', ()->
    replace : false
    templateUrl : 'templates/sb-pagination-control.html'
    controller :($scope, $rootScope, Blog)->
      $rootScope.$watch 'currentPage', ()->
        $scope.current = $rootScope.currentPage

      $rootScope.$watch 'totalPages', ()->
        $scope.total = $rootScope.totalPages

      $scope.canNext = ()->
        $scope.current < $scope.total - 1

      $scope.canPrev = ()->
        $scope.current > 0

      $scope.next = Blog.nextPage;
      $scope.prev = Blog.prevPage;