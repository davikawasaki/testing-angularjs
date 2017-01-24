var testingAngularApp = angular.module('testingAngularApp', []);

testingAngularApp.controller('testingAngularCtrl', function($http, $timeout, $scope, $rootScope) {
    var vm = this;

    // Data
    vm.title="Testing AngularJS Applications";
    vm.destinations = [];
    vm.newDestination = {
        city: undefined,
        country: undefined
    };
    vm.apiKey = "fc78376c81f004f44ba177131169cc07";

    // Methods
    vm.addDestination = addDestination;
    vm.removeDestination = removeDestination;

    ////////////////////////

    /*
     * Add destination in list
     */
    function addDestination()
    {
        vm.destinations.push(
            {
                city: vm.newDestination.city,
                country: vm.newDestination.country
            }
        );
    };

    /*
     * Remove destination from list
     * @param index
     */
    function removeDestination(index)
    {
        vm.destinations.splice(index, 1);
    };

    /*
     * Timeout message when it's defined
     */
     $rootScope.messageWatcher = $rootScope.$watch('message', function() {
        if ($rootScope.message) {
            $timeout(function () {
                $rootScope.message = null;
            }, 3000);
        }
     });

});

testingAngularApp.filter('warmestDestinations', function() {
    return function(destinations, minimumTemp) {
        var warmestDestinations = [];

        angular.forEach(destinations, function(destination) {
            if(destination.weather && destination.weather.temp && destination.weather.temp >= minimumTemp)
            {
                warmestDestinations.push(destination);
            }
        });

        return warmestDestinations;
    }
});

testingAngularApp.directive('destinationDirective', function() {
    return {
        scope: {
            destination: '=',
            apiKey: '=',
            onRemove: '&'
        },
        template:
            '<span>{{destination.city}}, {{destination.country}}</span>' +
            '<span ng-if="destination.weather">' +
                '- {{destination.weather.main}}, {{destination.weather.temp}} &#8451;' +
            '</span>' +
            '<button ng-click="onRemove()">X</button>' +
            '<button ng-click="getWeather(destination)">Update Weather</button>',
        controller: function($http, $rootScope, $scope) {
            var vm = this;

            // Data
            vm.destination = $scope.destination;
            vm.apiKey = $scope.apiKey;

            // Methods
            $scope.getWeather = getWeather;

            ////////////////////////
            /*
             * Get weather data from API Open Weather Map
             * @param destination
             */
            function getWeather(destination)
            {
                $http.get("http://api.openweathermap.org/data/2.5/weather?q="
                                + destination.city + "&APPID=" + vm.apiKey + "&units=metric")
                        .then(
                            function successCallback (response) {
                                if (response.data.weather) {
                                    destination.weather = {};
                                    destination.weather.main = response.data.weather[0].main;
                                    destination.weather.temp = response.data.main.temp;
                                } else {
                                    $rootScope.message = "City not found";
                                }
                            },
                            function errorCallback (error) {
                                console.log(error);
                                if (error.status == 502) {
                                    $rootScope.message = "City not found";
                                } else {
                                    $rootScope.message = error.data.message;
                                }
                            }
                        );
            };
        }
    }
});