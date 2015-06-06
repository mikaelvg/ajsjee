'use strict';

describe('Service: Myfactory', function () {

  // load the service's module
  beforeEach(module('WebappApp'));

  // instantiate service
  var Myfactory;
  beforeEach(inject(function (_Myfactory_) {
    Myfactory = _Myfactory_;
  }));

  it('should do something', function () {
    expect(!!Myfactory).toBe(true);
  });

});
