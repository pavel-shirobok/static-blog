angular
    .module 'sbGlobalLoader', [
        'sbGlobalLoaderCtrl', 'sbSpinner'
    ]
    .directive 'sbGlobalLoader', ()->
        replace : false
        restrict : 'E'
        templateUrl : 'templates/sb-global-loader.html',
        scope :
            size : '@'
        controller : 'sbGlobalLoaderCtrl'