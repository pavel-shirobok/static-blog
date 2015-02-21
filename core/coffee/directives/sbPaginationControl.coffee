angular
  .module 'sbPaginationControl', ['sbBlog']
  .directive 'sbPaginationControl', ()->
    replace : false
    templateUrl : 'templates/sb-pagination-control.html'
    controller :($scope, $rootScope, sbBlog)->
      $scope.current = 0
      $scope.total = 10
      #TODO extract controller to separate module
#      $rootScope.$watch 'currentPage', ()->
#        $scope.current = $rootScope.currentPage
#
#      $rootScope.$watch 'totalPages', ()->
#        $scope.total = $rootScope.totalPages
#
#      $scope.canNext = ()->
#        $scope.current < $scope.total - 1
#
#      $scope.canPrev = ()->
#        $scope.current > 0
#
#      $scope.next = Blog.nextPage;
#      $scope.prev = Blog.prevPage;