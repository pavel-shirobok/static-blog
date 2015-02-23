angular
  .module 'sbCode', []
  .directive 'sbCode', ->
    replace : false
    scope :
      lang : '@'
    controller : ($scope, $element) ->
      hljs.configure({useBR: false})
      hljs.highlightBlock($element.addClass($scope.lang)[0])
      ###hljs.highlightBlock(
        $element
          .find '.wrapper'
          .addClass($scope.lang)[0]
      )###
