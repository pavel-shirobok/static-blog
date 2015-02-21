angular
  .module 'sbLoadingManager', []
  .service 'sbLoadingManager', ()->
    self = this;
    self.indicators = [];
    self.state = false

    self.observe = (loaderIndicator)->
      self.indicators.push(loaderIndicator);
      loaderIndicator.show self.state

    self.loadingOn  = ->self.loading true
    self.loadingOff = ->self.loading false

    self.loading = (state)->
      self.state = state
      _.each(self.indicators, (indicator)->indicator.show(state));

    true