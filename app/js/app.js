var testingAngularApp = angular.module('testingAngularApp', []);

testingAngularApp.controller('testingAngularCtrl', function($http) {
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
                                }
                            },
                            function errorCallback (error) {
                                console.log(error);
                            }
                        );
    };

});