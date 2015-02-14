angular
  .module 'sbPaginationFilter', []
  .filter 'sbPaginationFilter', ($rootScope)->
    (value)-> if value? then value.splice $rootScope.currentPage * $rootScope.postsOnPage, $rootScope.postsOnPage