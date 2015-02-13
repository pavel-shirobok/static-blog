angular
  .module 'StaticBlogApp',
  [
    'ngRoute'
    'EntryPointController'
    'sbGlobalLoader'
    'sbSpinner',
    'sbThread',
    'sbHeader',
    'Blog',
    'sbPaginationFilter',
    'sbPaginationControl',
    'sbTreeElement'
  ]
  .config ($routeProvider, $locationProvider)->
    $locationProvider.html5Mode false

    $routeProvider
      .when '/page:number',
        templateUrl : 'templates/sb-view-thread.html',
        controller : (Blog, $routeParams)->
          #TODO check for 'string' number
          Blog.setCurrentPage(parseInt($routeParams.number));
      .when '/:year/:month/:day-:name',
        templateUrl : 'templates/sb-view-post.html'
        controller : ($scope, Blog, $routeParams)->
          Blog
            .getPost($routeParams.year, $routeParams.month, $routeParams.day, $routeParams.name)
            .then (post)->
              $scope.post = post
      .otherwise '/page0'
