/**
 * Setting the Starting Tests Suite
 *
 * Injects the module before each block of test
 */
describe('Testing AngularJS Test Suite', function() {
    beforeEach(module('testingAngularApp'));

    /**
     * Controller block tests
     *
     * Test title name in controller,
     * injecting the controller before each test
     *
     * To use a scope, needs to instantiate
     * a new one through $rootScope dependency
     *
     * After each block of code do a cleanup
     */
    describe('Testing AngularJS Controller', function() {
        var ctrl;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('testingAngularCtrl');
        }));

        afterEach(function() {
            // Cleanup code
        });

        it('should initialize the title in the scope', function() {
            // vm.title is already an attribute of the controller,
            // where vm equals to this
            expect(ctrl.title).toBeDefined();
            expect(ctrl.title).toBe("Testing AngularJS Applications");
        });
    });
});