angular
    .module 'sbGlobalLoader', [
        '_loader', 'sbSpinner'
    ]
    .directive 'sbGlobalLoader', ()->
        replace : false
        restrict : 'E'
        templateUrl : 'templates/sb-global-loader.html',
        scope :
            size : '@'
        controller : ($scope, $element, _loader) ->
            #TODO extract controller to separate module
            initial = $element.css 'display'
            $scope.$watch 'loading', () -> $element.css 'display', if $scope.loading then initial else 'none'
            this.show = (state) -> $scope.loading = state; this
            _loader.observe (this.show false)