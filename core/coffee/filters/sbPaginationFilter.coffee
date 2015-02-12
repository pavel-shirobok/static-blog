angular
  .module 'sbPaginationFilter', []
  .filter 'sbPaginationFilter', (Blog)->
    (value)->
      console.log 'filter call'
      value.splice Blog.currentPage*2, 2