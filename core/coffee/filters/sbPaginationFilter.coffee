angular
  .module 'sbPaginationFilter', []
  .filter 'sbPaginationFilter', ($rootScope)->
    (value)-> value.splice $rootScope.currentPage * $rootScope.postsOnPage, $rootScope.postsOnPage