angular
  .module 'sbPaginationFilter', []
  .filter 'sbPaginationFilter', (Blog)->
    (value)-> value.splice Blog.currentPage * Blog.postsOnPage, Blog.postsOnPage