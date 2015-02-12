angular.module('StaticBlogApp', ['ngRoute', 'EntryPointController', 'sbGlobalLoader', 'sbSpinner', 'sbThread', 'sbHeader', 'Blog']).config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  return $routeProvider.when('/', {
    templateUrl: 'templates/sb-view-thread.html'
  }).when('/:year/:month/:day-:name', {
    templateUrl: 'templates/sb-view-post.html',
    controller: function($scope, Blog, $routeParams) {
      return Blog.getPost($routeParams.year, $routeParams.month, $routeParams.day, $routeParams.name).then(function(post) {
        return $scope.post = post;
      });
    }
  }).otherwise('/');
});

angular.module('EntryPointController', ['_loader', 'BlogData']).controller('EntryPointController', function($scope, _loader, $timeout, BlogData) {
  _loader.loading(true);
  return BlogData.getPosts().then(function(data) {
    console.log(data);
    return _loader.loading(false);
  });
});

angular.module('ThreadViewCtrl', ['BlogData']).controller('ThreadViewCtrl', function($scope, BlogData) {
  return BlogData.getPosts().then(function(data) {
    return $scope.posts = data.posts;
  });
});

angular.module('sbCut', ['Blog']).directive('sbCut', function() {
  return {
    replace: false,
    scope: {
      isShort: '=',
      post: '='
    },
    templateUrl: 'templates/sb-cut.html',
    controller: function($scope, $element, Blog) {
      if ($scope.isShort) {
        $element.nextAll().remove();
      } else {
        $element.remove();
      }
      return $scope.open = Blog.openPost;
    }
  };
});

angular.module('sbGlobalLoader', ['_loader', 'sbSpinner']).directive('sbGlobalLoader', function() {
  return {
    replace: false,
    restrict: 'E',
    templateUrl: 'templates/sb-global-loader.html',
    scope: {
      size: '@'
    },
    controller: function($scope, $element, _loader) {
      var initial;
      initial = $element.css('display');
      $scope.$watch('loading', function() {
        return $element.css('display', $scope.loading ? initial : 'none');
      });
      this.show = function(state) {
        $scope.loading = state;
        return this;
      };
      return _loader.observe(this.show(false));
    }
  };
});

angular.module('sbHeader', []).directive('sbHeader', function() {
  return {
    replace: false,
    scope: {
      blogName: '@'
    },
    templateUrl: 'templates/sb-header.html',
    controller: function($scope) {
      return console.log($scope.blogName);
    }
  };
});

angular.module('sbImg', ['BlogData']).directive('sbImg', function() {
  return {
    replace: false,
    scope: {
      post: '=',
      alt: '@',
      src: '@',
      title: '@'
    },
    templateUrl: 'templates/sb-img.html',
    controller: function($scope, BlogData) {
      return angular.noop();
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
    templateUrl: 'templates/sb-post.html',
    controller: function($scope, BlogData) {
      return angular.noop();
    }
  };
});

angular.module('sbSpinner', []).directive('sbSpinner', function() {
  return {
    replace: false,
    restrict: 'E',
    templateUrl: 'templates/sb-spinner.html',
    scope: {
      size: '@'
    },
    controller: function($scope, $element) {
      var update;
      update = function() {
        return $element.css({
          fontSize: $scope.size
        });
      };
      update();
      return $scope.$watch('size', update);
    }
  };
});

angular.module('sbThread', ['sbPost', 'BlogData']).directive('sbThread', function() {
  return {
    replace: false,
    templateUrl: 'templates/sb-thread.html',
    controller: function($scope, BlogData) {
      return BlogData.getPosts().then(function(data) {
        return $scope.posts = data.posts;
      });
    }
  };
});

angular.module('Blog', ['BlogData']).service('Blog', function($q, BlogData, $rootScope) {
  var data, defer;
  data = void 0;
  defer = $q.defer();
  defer.promise.then(angular.noop);
  BlogData.getPosts().then(function(d) {
    data = d;
    return defer.resolve();
  });
  this.openPost = function(post) {
    defer.promise.then(function() {
      return console.log('Opening post', post.postName);
    });
    if (data) {
      return defer.resolve();
    }
  };
  this.getPost = function(year, month, day, name) {
    return defer.promise.then(function() {
      var query;
      query = [year, month, day + '-' + name];
      return _.find(data.posts, function(post) {
        var post_q;
        post_q = post.directory.concat();
        post_q[post_q.length - 1] = post.postFileName;
        return _.isEqual(query, post_q);
      });
    });
    if (data) {
      return defer.resolve();
    }
  };
  return this;
});

angular.module('BlogData', []).service('BlogData', function($http, $q) {
  var contentDir, data, dataPromise, injectDataToPosts, loadTree, postDataProcessing, self;
  self = this;
  data = void 0;
  contentDir = 'content';
  dataPromise = $http.get([contentDir, 'blogDescriptor.json'].join('/')).then(function(d) {
    data = d.data;
    return postDataProcessing(data);
  });
  postDataProcessing = function(data) {
    console.log(data);
    injectDataToPosts(data);
    loadTree(data.tree, data);
    return data;
  };
  injectDataToPosts = function(data) {
    $(data.posts).each(function(i, post) {
      post.image = (function(fileName) {
        return self.getImagePath(this, fileName);
      }).bind(post);
      post.url = self.getPostUrl(post);
      return post.date = (new Date(post.directory[0], post.directory[1], post.directory[2])).getTime();
    });
    return data;
  };
  loadTree = function(root, data) {
    if (_.isArray(root)) {
      return _.each(root, function(indexFromTree, itemIndex) {
        return root[itemIndex] = data.posts[indexFromTree];
      });
    } else {
      return _.each(root, function(value, key) {
        return loadTree(root[key], data);
      });
    }
  };
  this.getPosts = function() {
    if (data != null) {
      return $q(function(resolve) {
        return resolve(data);
      });
    } else {
      return dataPromise;
    }
  };
  this.getPostUrl = function(post) {
    return [contentDir, post.directory[0], post.directory[1], post.postFileName + '.html'].join('/');
  };
  this.getImagePath = function(post, imageFileName) {
    return [contentDir, post.directory[0], post.directory[1], imageFileName].join('/');
  };
  return this;
});

angular.module('_loader', []).service('_loader', function() {
  var self;
  self = this;
  self.indicators = [];
  self.state = false;
  self.observe = function(loaderIndicator) {
    self.indicators.push(loaderIndicator);
    return loaderIndicator.show(self.state);
  };
  self.loading = function(state) {
    self.state = state;
    return _.each(self.indicators, function(indicator) {
      return indicator.show(state);
    });
  };
  return true;
});
