(function(angular, undefined) {
    'use strict';

    angular.module('dashboardControllers', [])

    .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http'];

    function DashboardController($http) {
        var vm = this;

        vm.list = list;
        vm.create = create;

        vm.title = 'texto';

        function list() {
            $http.get('/api/v1/monitors').success(function (data) {
                console.log('>>>' + JSON.stringify(data));
            });
        }

        function create() {
            $http.post('/api/v1/monitors', {name: 'bla'}).success(function (data) {
                console.log('>>>' + JSON.stringify(data));
            });
        }
    }
})(angular);
