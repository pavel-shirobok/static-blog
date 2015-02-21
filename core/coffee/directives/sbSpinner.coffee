angular
  .module 'sbSpinner', [ 'sbSpinnerCtrl' ]
  .directive 'sbSpinner', ()->
    replace : false
    restrict : 'E'
    templateUrl : 'templates/sb-spinner.html'
    scope :  { size : '@' }
    controller : "sbSpinnerCtrl"