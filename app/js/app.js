var testingAngularApp = angular.module('testingAngularApp', []);

testingAngularApp.controller('testingAngularCtrl', function($http, $timeout, $scope) {
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
    vm.getWeather = getWeather;

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
                                    vm.message = "City not found";
                                }
                            },
                            function errorCallback (error) {
                                console.log(error);
                                if (error.status == 502) {
                                    vm.message = "City not found";
                                } else {
                                    vm.message = error.data.message;
                                }
                            }
                        );
    };

    /*
     * Timeout message when it's defined
     */
     vm.messageWatcher = $scope.$watch('vm.message', function() {
        if (vm.message) {
            $timeout(function () {
                vm.message = null;
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