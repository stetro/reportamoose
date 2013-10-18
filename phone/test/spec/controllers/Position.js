'use strict';

describe('Controller: PositionCtrl', function () {

  // load the controller's module
  beforeEach(module('phoneApp'));

  var PositionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PositionCtrl = $controller('PositionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
