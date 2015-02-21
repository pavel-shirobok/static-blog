angular.module('StaticBlogApp', ['sbRouting', 'sbGlobalLoader', 'sbHeader', 'sbThread', 'sbTreeElement']);

angular.module('sbConstants', []).constant('CONTENT_ROOT', 'content').constant('DESCRIPTOR_FILE_NAME', 'blogDescriptor.json').constant('DISQUS_SHORT_NAME', 'blog-ramshteks');

angular.module('sbRouting', ['ngDisqus', 'ngRoute', 'sbConstants', 'BootstrapStateCtrl', 'ThreadViewStateCtrl', 'PostViewStateCtrl']).config(function($routeProvider, $locationProvider, $disqusProvider, DISQUS_SHORT_NAME) {
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');
  $disqusProvider.setShortname(DISQUS_SHORT_NAME);
  $routeProvider.when('/loading', {
    template: '',
    controller: 'BootstrapStateCtrl'
  }).when('/page:pageIndex', {
    templateUrl: 'templates/sb-view-thread.html',
    controller: 'ThreadViewStateCtrl'
  }).when('/:year/:month/:name', {
    templateUrl: 'templates/sb-view-post.html',
    controller: 'PostViewStateCtrl'
  }).otherwise('/loading');
  return this;
});

angular.module('sbCutCtrl', ['sbBlog']).controller('sbCutCtrl', function($scope, $element, sbBlog) {
  if ($scope.isShort) {
    $element.nextAll().remove();
  } else {
    $element.remove();
  }
  return $scope.open = sbBlog.openPost;
});

angular.module('sbGlobalLoaderCtrl', ['sbLoadingManager']).controller('sbGlobalLoaderCtrl', function($scope, $element, sbLoadingManager) {
  var initial, observable;
  initial = $element.css('display');
  observable = {
    show: function(state) {
      $scope.loading = state;
      return observable;
    }
  };
  $scope.$watch('loading', function() {
    return $element.css('display', $scope.loading ? initial : 'none');
  });
  observable.show(false);
  return sbLoadingManager.observe(observable);
});

angular.module('sbHeaderCtrl', ['sbBlog']).controller('sbHeaderCtrl', function($scope, sbBlog) {
  $scope.toMain = sbBlog.toMain;
  return this;
});

angular.module("sbSpinnerCtrl", []).controller("sbSpinnerCtrl", function($scope, $element) {
  var update;
  update = function() {
    return $element.css({
      fontSize: $scope.size
    });
  };
  return $scope.$watch('size', update);
});

angular.module("sbTreeElementCtrl", ["sbBlog", "sbBlogData"]).controller("sbTreeElementCtrl", function($scope, $element, sbBlog, sbBlogData, $compile) {
  var createTree;
  $scope.onClick = function() {
    if ($scope.post) {
      return sbBlog.openPost($scope.post);
    }
  };
  createTree = function() {
    var path;
    if ($scope.path === '/') {
      path = [];
    } else {
      path = $scope.path.split('/');
    }
    if (path.length === 3) {
      $scope.post = sbBlogData.getRoot(sbBlogData.data.tree, path);
      return $scope.label = $scope.post.postName;
    } else {
      if (path.length === 0) {
        $scope.label = '/';
      } else {
        $scope.label = path[path.length - 1];
      }
      return _.each(sbBlogData.getRoot(sbBlogData.data.tree, path), function(value, key) {
        var newTreeElement, temp_path;
        temp_path = path.concat(key);
        newTreeElement = angular.element('<sb-tree-element>').attr('path', temp_path.join('/')).appendTo($element.find('.wrapper'));
        return $compile(newTreeElement)($scope);
      });
    }
  };
  sbBlogData.load().then(createTree);
  return this;
});

angular.module('sbCut', ['sbCutCtrl']).directive('sbCut', function() {
  return {
    replace: false,
    scope: {
      isShort: '=',
      post: '='
    },
    templateUrl: 'templates/sb-cut.html',
    controller: 'sbCutCtrl'
  };
});

angular.module('sbGlobalLoader', ['sbGlobalLoaderCtrl', 'sbSpinner']).directive('sbGlobalLoader', function() {
  return {
    replace: false,
    restrict: 'E',
    templateUrl: 'templates/sb-global-loader.html',
    scope: {
      size: '@'
    },
    controller: 'sbGlobalLoaderCtrl'
  };
});

angular.module('sbHeader', ['sbBlog', 'sbHeaderCtrl']).directive('sbHeader', function() {
  return {
    replace: false,
    scope: {
      blogName: '@'
    },
    templateUrl: 'templates/sb-header.html',
    controller: 'sbHeaderCtrl'
  };
});

angular.module('sbImg', ['sbBlogData']).directive('sbImg', function() {
  return {
    replace: false,
    scope: {
      post: '=',
      alt: '@',
      src: '@',
      title: '@'
    },
    templateUrl: 'templates/sb-img.html'
  };
});

angular.module('sbPaginationControl', ['sbBlog']).directive('sbPaginationControl', function() {
  return {
    replace: false,
    templateUrl: 'templates/sb-pagination-control.html',
    controller: function($scope, $rootScope, sbBlog) {
      $scope.current = 0;
      return $scope.total = 10;
    }
  };
});

angular.module('sbPost', ['sbCut', 'sbImg']).directive('sbPost', function() {
  return {
    replace: false,
    scope: {
      post: '=',
      isShort: '='
    },
    templateUrl: 'templates/sb-post.html'
  };
});

angular.module('sbSpinner', ['sbSpinnerCtrl']).directive('sbSpinner', function() {
  return {
    replace: false,
    restrict: 'E',
    templateUrl: 'templates/sb-spinner.html',
    scope: {
      size: '@'
    },
    controller: "sbSpinnerCtrl"
  };
});

angular.module('sbThread', ['sbPost', 'sbBlogData', 'sbPaginationFilter']).directive('sbThread', function() {
  return {
    replace: false,
    templateUrl: 'templates/sb-thread.html',
    controller: function($scope, sbBlogData) {
      if (sbBlogData.data) {
        return $scope.posts = sbBlogData.data.posts;
      }
    }
  };
});

angular.module('sbTreeElement', ['sbTreeElementCtrl']).directive('sbTreeElement', function() {
  return {
    replace: false,
    restrict: 'E',
    templateUrl: 'templates/sb-tree-element.html',
    scope: {
      type: '@',
      path: '@'
    },
    controller: "sbTreeElementCtrl"
  };
});

angular.module('sbView', ['ngRoute']).directive('sbView', function() {
  return {
    replace: false,
    template: '<div ng-view></div>'
  };
});

angular.module('sbPaginationFilter', []).filter('sbPaginationFilter', function() {
  return function(value, currentPage, postsPerPage) {
    if (value != null) {
      return value.splice(currentPage * postsPerPage, postsPerPage);
    }
  };
});

angular.module('sbBlog', ['sbBlogData']).service('sbBlog', function($q, sbBlogData, $location, $rootScope) {
  var self;
  self = this;
  self.loadingState = function() {
    return $location.path('loading');
  };
  self.toMain = function() {
    return self.openPage(0);
  };
  self.openPage = function(index) {
    return $location.path('page' + index);
  };
  self.saveRedirectPath = function(_at_path) {
    this.path = _at_path;
  };
  self.restorePath = function() {
    if (self.path && self.path !== '/loading') {
      return $location.path(self.path);
    } else {
      return self.toMain();
    }
  };
  self.openPost = function(post) {
    return $location.path(post.directory.concat(post.postFileName).join('/'));
  };
  self.getPostByPath = function(year, month, name) {
    return sbBlogData.getRoot(sbBlogData.data.tree, [year, month, name]);
  };
  return this;
});

angular.module('sbBlogData', ['sbConstants']).service('sbBlogData', function($http, $q, CONTENT_ROOT, DESCRIPTOR_FILE_NAME) {
  var self;
  self = this;
  self.data = void 0;
  self.loadingPromise = void 0;
  self.load = function() {
    var loadingPromise;
    if (!loadingPromise) {
      loadingPromise = $http.get(self.path([CONTENT_ROOT, DESCRIPTOR_FILE_NAME])).then(function(raw) {
        return self.data = self.preProcessData(raw.data);
      });
    }
    return loadingPromise;
  };
  self.preProcessData = function(raw) {
    self.extendPosts(raw);
    self.loadPostsInTree(raw.tree, raw);
    return raw;
  };
  self.extendPosts = function(raw) {
    _.each(raw.posts, function(post) {
      post.image = (function(fileName) {
        return self.getImagePath(this, fileName);
      }).bind(post);
      post.url = self.getPostUrl(post);
      return post.date = (new Date(post.date)).getTime();
    });
    return raw;
  };
  self.loadPostsInTree = function(root, data) {
    return _.each(root, function(value, key) {
      if (_.isNumber(value)) {
        return root[key] = data.posts[value];
      } else {
        return self.loadPostsInTree(value, data);
      }
    });
  };
  self.path = function(arr) {
    return arr.join('/');
  };
  self.postPath = function(post, fileName) {
    return self.path([CONTENT_ROOT].concat(post.directory, fileName));
  };
  self.getPostUrl = function(post) {
    return self.postPath(post, post.postFileName + '.html');
  };
  self.getImagePath = function(post, fileName) {
    return self.postPath(post, fileName);
  };
  self.getRoot = function(root, path) {
    path = path.concat();
    if (path.length === 0) {
      return root;
    }
    if (path.length === 1) {
      return root[path[0]];
    } else {
      return this.getRoot(root[path.shift()], path);
    }
  };
  return this;
});

angular.module('sbLoadingManager', []).service('sbLoadingManager', function() {
  var self;
  self = this;
  self.indicators = [];
  self.state = false;
  self.observe = function(loaderIndicator) {
    self.indicators.push(loaderIndicator);
    return loaderIndicator.show(self.state);
  };
  self.loadingOn = function() {
    return self.loading(true);
  };
  self.loadingOff = function() {
    return self.loading(false);
  };
  self.loading = function(state) {
    self.state = state;
    return _.each(self.indicators, function(indicator) {
      return indicator.show(state);
    });
  };
  return true;
});

angular.module('BootstrapStateCtrl', ['sbBlogData', 'sbLoadingManager', 'sbBlog']).controller('BootstrapStateCtrl', function($scope, $timeout, sbBlogData, sbBlog, sbLoadingManager) {
  var bootstrapApp;
  sbLoadingManager.loadingOn();
  bootstrapApp = function() {
    sbLoadingManager.loadingOff();
    return sbBlog.restorePath();
  };
  if (sbBlogData.data) {
    bootstrapApp();
  } else {
    sbBlogData.load().then(bootstrapApp);
  }
  return this;
});

angular.module('PostViewStateCtrl', ['ngRoute', 'sbBlog', 'sbBlogData']).controller('PostViewStateCtrl', function($scope, sbBlog, sbBlogData, $location, $routeParams) {
  if (sbBlogData.data) {
    $scope.post = sbBlog.getPostByPath($routeParams.year, $routeParams.month, $routeParams.name);
  } else {
    sbBlog.saveRedirectPath($location.path());
    sbBlog.loadingState();
  }
  return this;
});

angular.module('ThreadViewStateCtrl', ['sbBlog', 'sbBlogData', 'ngRoute']).controller('ThreadViewStateCtrl', function(sbBlogData, sbBlog, $routeParams, $location) {
  if (sbBlogData.data) {

  } else {
    sbBlog.saveRedirectPath($location.path());
    sbBlog.loadingState();
  }
  return this;
});
