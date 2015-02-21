angular
  .module 'sbHeaderCtrl', [ 'sbBlog' ]
  .controller 'sbHeaderCtrl', ($scope, sbBlog)->
    $scope.toMain = sbBlog.toMain
    return this