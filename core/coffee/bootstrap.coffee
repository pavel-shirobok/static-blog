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
    'sbPaginationFilter'
  ]
  .config ($routeProvider, $locationProvider)->
    $locationProvider.html5Mode false

    $routeProvider
      .when '/page:num',
        templateUrl : 'templates/sb-view-thread.html',
        controller : (Blog, $routeParams)->
          Blog.currentPage = $routeParams.num
      .when '/:year/:month/:day-:name',
        templateUrl : 'templates/sb-view-post.html'
        controller : ($scope, Blog, $routeParams)->
          Blog
            .getPost($routeParams.year, $routeParams.month, $routeParams.day, $routeParams.name)
            .then (post)->
              $scope.post = post
      .otherwise '/page0'
