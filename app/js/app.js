var testingAngularApp = angular.module('testingAngularApp', []);

testingAngularApp.controller('testingAngularCtrl', function($rootScope) {
    var vm = this;

    // Data
    vm.title="Testing AngularJS Applications";
    vm.destinations = [];
    vm.newDestination = {
        city: undefined,
        country: undefined
    };

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


});