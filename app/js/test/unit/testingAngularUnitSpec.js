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
     * Test all functions related to the
     * testingAngularCtrl controller
     *
     * To use a scope, needs to instantiate
     * a new one through $rootScope dependency
     *
     * After each block of code, account for all possible
     * backend calls that could be happening
     */
    describe('Testing AngularJS Controller', function() {
        var ctrl, httpBackend, timeout, rootScope;

        beforeEach(inject(function($controller, $rootScope, $httpBackend, $timeout) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            ctrl = $controller('testingAngularCtrl', {
                $scope: scope
            });
            httpBackend = $httpBackend;
            timeout = $timeout;
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
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

        /*
         * Test if an error message disappears after timeout
         *
         * Check if an error message is displayed,
         * firing the digest cycle to update the DOM
         * and then flush the timeout to verify if
         * the message has been cleared out.
         */
        it('should remove error message after a fixed period of time', function() {
            rootScope.message = "Error";
            expect(rootScope.message).toBe("Error");

            // Check for any changes and fire the digest cycle
            rootScope.$apply();
            timeout.flush();

            expect(rootScope.message).toBeNull();
        });
    });

    /*
     * Filter block tests
     *
     * Test all functions related to the
     * warmestDestinations filter
     *
     * In order to test a filter, it needs to inject
     * its dependency in the it block.
     * In this case, it doesn't need a beforeEach() function
     * because there's only a filter function to test
     */
    describe('Testing AngularJS Filter', function() {

        /*
         * Test if warm destinations are filtered accordingly
         *
         * Defines the list of destinations and call
         * the warmestDestinations to filter according
         * to weather, temperature existence and
         * under the determined temperature
         */
        it('should return only warm destinations', inject(function($filter) {
            var warmest = $filter('warmestDestinations');

            var destinations = [
                {
                    city: "Beijing",
                    country: "China",
                    weather: {
                        temp: 21
                    }
                },
                {
                    city: "Moscow",
                    country: "Russia"
                },
                {
                    city: "Mexico City",
                    country: "Mexico",
                    weather: {
                        temp: 12
                    }
                },
                {
                    city: "Lima",
                    country: "Peru",
                    weather: {
                        temp: 15
                    }
                }
            ];

            expect(destinations.length).toBe(4);

            var warmestDestinations = warmest(destinations, 15);

            expect(warmestDestinations.length).toBe(2);
            expect(warmestDestinations[0].city).toBe("Beijing");
            expect(warmestDestinations[1].city).toBe("Lima");
        }));
    });

    /*
     * Service block tests
     *
     * Test all functions related to the
     * conversion service
     *
     * In order to test a service, it needs to inject
     * its service dependency in the it block.
     * In this case, it doesn't need a beforeEach() function
     * because there's only a service function to test
     */
    describe('Testing AngularJS Service', function() {

        /*
         * Test if a temperature is converted properly
         */
        it('should return the converted value', inject(function(conversionService) {
            conversionService = conversionService;
            var temp = 288;

            var conversionResult = conversionService.convertKelvinToCelsius(temp);
            expect(conversionResult).toBe(15);
        }));
    });

    /*
     * Directive block tests
     *
     * Test all functions related to
     * directives and their isolate scopes
     *
     * In order to test a filter, it needs to inject
     * its dependency beforeEach block test,
     * declaring specially its isolateScope,
     * which is the isolated area within the directive element.
     *
     * Also make a mocked version of the conversion service
     * to isolate the service and doesn't depend totally
     * on the lines of the whole service.
     *
     * With the mocked seservicervice dependency in the beforeEach block,
     * it'll focus on the concerned component as well as making it possible
     * to update the raw service and still pass the related tests.
     */
    describe('Testing AngularJS Directive', function() {
        var scope, template, httpBackend, isolateScope,rootScope;

        beforeEach(function () {
            module(function($provide) {
                var conversionServiceMock = {
                    convertKelvinToCelsius: function(temp) {
                        return Math.round(temp - 273);
                    }
                };

                // Any reference to the conversion service
                // will inject instead the mocked conversion service
                // wrote in the up written object.
                $provide.value('conversionService', conversionServiceMock);
            });
        });

        beforeEach(inject(function($compile, $rootScope, $httpBackend, $rootScope) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            httpBackend = $httpBackend;

            scope.destination = {
                city: "Tokyo",
                country: "Japan"
            };

            scope.apiKey = "xyz";

            // Contains HTML of the directive
            var element = angular.element(
                '<div destination-directive destination="destination" api-key="apiKey" on-remove="remove()">'+
                '</div>'
            );

            // Compile the element with the scope into the template
            // generating the directive's HTML with the scope just created
            template = $compile(element)(scope);
            scope.$digest();

            isolateScope = element.isolateScope();
        }));

        /*
         * Test removal from destinations list
         *
         * Starts with a predefined destination object.
         * After that, it mocks a predefined response from
         * the HTTP API request and calls the getWeather function
         * from the injected controller. After a flush update,
         * verify if the weather and temperature results
         * matches the ones from the predefined response.
         *
         * In this case doesn't work with vm from controller,
         * but with scope and isolateScope because it's inside
         * the directive block of tests
         */
        it('should update the weather for a specific destination', function() {
            scope.destination = {
                city: "Melbourne",
                country: "Australia"
            };

            // Version with expectGET() function

            // httpBackend
            //     .expectGET("http://api.openweathermap.org/data/2.5/weather?q="
            //     + ctrl.destination.city + "&APPID=" + ctrl.apiKey + "&units=metric")
            //     .respond(
            //         {
            //             weather: [{main: 'Rain', detail: 'Light rain'}],
            //             main: {temp: 15}
            //         }
            //     );

            // Version with when() function and response type

            httpBackend
                .when('GET', 'http://api.openweathermap.org/data/2.5/weather?q='
                          + scope.destination.city + '&APPID=' + scope.apiKey)
                .respond(
                    200,
                    {
                        weather: [{main: 'Rain', detail: 'Light rain'}],
                        main: {temp: 288}
                    }
                );

            isolateScope.getWeather(scope.destination);

            // Tells angular to respond to all pending requests,
            // where all WHEN configurations are resolved and
            // set synchronous control over the asynchronous
            // $http.get functions
            httpBackend.flush();

            expect(scope.destination.weather.main).toBe("Rain");
            expect(scope.destination.weather.temp).toBe(15);
        });

        /*
         * Test city not found
         *
         * Mock an empty object to be received, tracking
         * through an empty response and a 502 response
         */
        it('should add a message if no city is found', function() {
            scope.destination = {
                city: "Melbourne",
                country: "Australia"
            };

            httpBackend
                .when('GET', 'http://api.openweathermap.org/data/2.5/weather?q='
                          + scope.destination.city + '&APPID=' + scope.apiKey)
                .respond(
                    200,
                    {}
                );

            isolateScope.getWeather(scope.destination);

            httpBackend.flush();

            expect(rootScope.message).toBe("City not found");

            httpBackend
                .expectGET('http://api.openweathermap.org/data/2.5/weather?q='
                          + scope.destination.city + '&APPID=' + scope.apiKey)
                .respond(502);

            isolateScope.getWeather(scope.destination);

            httpBackend.flush();

            expect(rootScope.message).toBe("City not found");
        });

        /*
         * Test server 500 response
         *
         * Check if the server doesn't returned the proper data
         */
        it('should add a message when there is a server error', function() {
            scope.destination = {
                city: "Melbourne",
                country: "Australia"
            };

            httpBackend
                .expectGET('http://api.openweathermap.org/data/2.5/weather?q='
                          + scope.destination.city + '&APPID=' + scope.apiKey)
                .respond(500);

            isolateScope.getWeather(scope.destination);
            httpBackend.flush();

            expect(rootScope.message).toBe("Server Error");
        });

        /*
         * Mock test of the parent remove function
         *
         * Call the remove function from father
         * and verify if it's been called and it's working.
         */
        it('should call the parent controller remove function', function() {
            scope.removeTest = 1;
            scope.remove = function() {
                scope.removeTest++;
            };
            isolateScope.onRemove();
            expect(scope.removeTest).toBe(2);
        });

        /*
         * Test the generated HTML with the destination city and country
         *
         * Update the destination and verify if the template
         * contains the respective city and country. Needs
         * to digest the cycle of scope in order to update
         * the data that's been changed.
         */
        it('should generate the correct HTML', function() {
            var templateAsHtml = template.html();

            expect(templateAsHtml).toContain('Tokyo, Japan');

            scope.destination.city = "London";
            scope.destination.country = "England";

            scope.$digest();
            templateAsHtml = template.html();

            expect(templateAsHtml).toContain('London, England');
        });

    });
});