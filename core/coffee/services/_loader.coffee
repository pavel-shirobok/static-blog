angular
  .module '_loader', []
  .service '_loader', ()->
    self = this;
    self.indicators = [];
    self.state = false
    self.observe = (loaderIndicator)->
      self.indicators.push(loaderIndicator);
      loaderIndicator.show self.state
    self.loading = (state)->
      self.state = state
      _.each(self.indicators, (indicator)->indicator.show(state));

    true