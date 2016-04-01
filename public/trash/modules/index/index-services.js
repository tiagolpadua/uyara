(function(angular, undefined) {
    'use strict';

    angular.module('indexServices', [])
        .factory('LoginService', LoginService)
        .factory('AmbientesService', AmbientesService);

    AmbientesService.$inject = ['$http', '$rootScope', '$window'];

    function AmbientesService($http, $rootScope, $window) {
        var that = this;

        var factory = {};

        factory.login = function(successCallback) {
            return $http.get('/api/v1/ambientes')
                .success(function(response) {
                    successCallback(response);
                })
                .error(function(response) {
                    $window.alert(JSON.stringify(response));
                });
        };

        return factory;
    }

    LoginService.$inject = ['$http', '$rootScope', '$window'];

    function LoginService($http, $rootScope, $window) {
        var that = this;

        var factory = {};

        factory.login = function(login, password, successCallback) {
            $http.post('/api/v1/login', {
                    login: login,
                    password: password
                })
                .success(function(response) {
                    that.userName = login;
                    $rootScope.userName = login;
                    successCallback();
                })
                .error(function(data) {
                    $window.alert(JSON.stringify(data));
                });
        };

        factory.isLogado = function() {
            return !!that.userName;
        };

        factory.getUserName = function() {
            return that.userName;
        };

        factory.logout = function(successCallback) {
            $http.post('/api/v1/logout')
                .success(function() {
                    that.userName = null;
                    $rootScope.userName = null;
                    successCallback();
                })
                .error(function(data) {
                    $window.alert(JSON.stringify(data));
                });
        };

        return factory;
    }
})(angular);
