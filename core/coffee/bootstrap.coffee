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
    'sbTreeElement',
    'ngDisqus'
  ]
  .config ($routeProvider, $locationProvider, $disqusProvider)->
    $locationProvider.html5Mode false
    $locationProvider.hashPrefix('!');
    $disqusProvider.setShortname('blog-ramshteks');

    #todo extract controller to separate modules
    $routeProvider
      .when '/page:number',
        templateUrl : 'templates/sb-view-thread.html',
        controller : (Blog, $routeParams)->
          #TODO check for 'string' number
          Blog.setCurrentPage(parseInt($routeParams.number));
      .when '/:year/:month/:day-:name',
        templateUrl : 'templates/sb-view-post.html'
        controller : ($scope, Blog, $routeParams)->
          #todo remove day and name params, make it simpler
          Blog
            .getPost($routeParams.year, $routeParams.month, $routeParams.day, $routeParams.name)
            .then (post)->
              $scope.post = post
      .otherwise '/page0'
