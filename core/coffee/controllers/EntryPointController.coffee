angular
  .module 'EntryPointController', ['_loader', 'BlogData']
  .controller 'EntryPointController', ($scope, _loader, $timeout, BlogData) ->
    _loader.loading true

    BlogData.getPosts().then (data)->
      console.log data
      _loader.loading false

    #$timeout (()->_loader.loading( false)), 2500
