(function(angular, undefined) {
    'use strict';

    angular.module('uyaraApp')

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/app/dashboard/dashboard.html'
        });
    }]);
})(angular);
