angular
  .module 'sbThreadCtrl', ['sbBlogData']
  .controller 'sbThreadCtrl',
    ($scope, sbBlogData)-> if sbBlogData.data then $scope.posts = sbBlogData.data.posts