'use strict';

describe('Controller: PictureCtrl', function () {

  // load the controller's module
  beforeEach(module('phoneApp'));

  var PictureCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PictureCtrl = $controller('PictureCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
