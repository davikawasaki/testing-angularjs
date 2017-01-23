/*
 * Setting the Starting Tests Suite
 *
 * Injects the module before each block of test
 */
describe('Testing AngularJS Test Suite', function() {
    beforeEach(module('testingAngularApp'));

    /*
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

        /*
         * Test the initialized title in scope
         *
         * vm.title is already an attribute of the controller,
         * where vm equals to reserved variable this
         */
        it('should initialize the title in the scope', function() {
            expect(ctrl.title).toBeDefined();
            expect(ctrl.title).toBe("Testing AngularJS Applications");
        });

        /*
         * Test 2 destinations added to destinations list
         *
         * Verifies if the list is defined and empty,
         * then add each destination and check its
         * city, country, and if exists total destination.
         * Also verifies if new city is added in the end of list
         */
        it('should add 2 destinations to the destinations list', function() {
            expect(ctrl.destinations).toBeDefined();
            expect(ctrl.destinations.length).toBe(0);
            ctrl.newDestination = {
                city: "London",
                country: "England"
            };
            ctrl.addDestination();

            expect(ctrl.destinations.length).toBe(1);
            expect(ctrl.destinations[0].city).toBe("London");
            expect(ctrl.destinations[0].country).toBe("England");

            ctrl.newDestination.city = "Frankfurt";
            ctrl.newDestination.country = "Germany";
            ctrl.addDestination();

            expect(ctrl.destinations.length).toBe(2);
            expect(ctrl.destinations[1].city).toBe("Frankfurt");
            expect(ctrl.destinations[1].country).toBe("Germany");

            expect(ctrl.destinations[0].city).toBe("London");
            expect(ctrl.destinations[0].country).toBe("England");
        });

        /*
         * Test removal from destinations list
         *
         * Starts with a predefined destinations list
         * and then remove the first object.
         * Then, verifies if the list length has been reduced
         * and checks if the last element has become the first
         */
        it('should remove a destination from the destinations list', function() {
            ctrl.destinations = [
                {
                    city: "Paris",
                    country: "France"
                },
                {
                    city: "Warsaw",
                    country: "Poland"
                }
            ];
            expect(ctrl.destinations.length).toBe(2);

            ctrl.removeDestination(0);
            expect(ctrl.destinations.length).toBe(1);
            expect(ctrl.destinations[0].city).toBe("Warsaw");
            expect(ctrl.destinations[0].country).toBe("Poland");
        });
    });
});