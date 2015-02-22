angular
  .module 'sbPaginationFilter', []
  .filter 'sbPaginationFilter', ()->
    (value, current, ppp) -> if value? then value.splice current * ppp, ppp