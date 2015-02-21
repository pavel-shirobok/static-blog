angular
  .module 'sbPaginationFilter', []
  .filter 'sbPaginationFilter', ()->
    (value, currentPage, postsPerPage)->
      if value? then value.splice currentPage * postsPerPage, postsPerPage