angular
.module 'sbRouting',
  [
    'ngDisqus'
    'ngRoute'
    'sbConstants'
    'BootstrapStateCtrl'
    'ThreadViewStateCtrl'
    'PostViewStateCtrl'
  ]
.config ($routeProvider, $locationProvider, $disqusProvider, DISQUS_SHORT_NAME)->
  $locationProvider.html5Mode false
  $locationProvider.hashPrefix('!');

  $disqusProvider.setShortname(DISQUS_SHORT_NAME)

  $routeProvider
    .when '/loading',
      template : ''
      controller : 'BootstrapStateCtrl'

    .when '/page:pageIndex',
      templateUrl : 'templates/sb-view-thread.html'
      controller : 'ThreadViewStateCtrl'

    .when '/:year/:month/:name',
      templateUrl : 'templates/sb-view-post.html'
      controller : 'PostViewStateCtrl'

    .otherwise('/loading')

  return this;