(function(angular, undefined) {
    'use strict';

    angular.module('appControllers', [])

    .controller('AppController', AppController);

    AppController.$inject = [];

    function AppController() {
        var vm = this;

        vm.appTitle = 'Uyara';
        vm.appSubTitle = 'Yet Another Monitoring Tool';

        vm.getAppFullTitle = getAppFullTitle;

        function getAppFullTitle() {
            return vm.appTitle + ' - ' + vm.appSubTitle;
        }

    }
})(angular);
