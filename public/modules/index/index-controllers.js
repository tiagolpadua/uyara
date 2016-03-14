(function (angular, undefined) {
    'use strict';
    
    angular.module('indexControllers', ['indexServices'])
        .controller('IndexController', IndexController);

	IndexController.$inject = ['$http', '$location', '$window', 'LoginService'];

    function IndexController($http, $location, $window, LoginService) {
        var vm = this;

        vm.login = login;        

        vm.isLogado = LoginService.isLogado;

        vm.logout = logout;

        vm.getUserName = LoginService.getUserName;

        function login() {
            LoginService.login(vm.usuarioLogin, vm.senhaLogin, function() {
                vm.usuarioLogin = null;
                vm.senhaLogin = null;
                $location.path('/painel');
            });
        }

        function logout() {
            LoginService.logout(function() {
                $location.path('/index');
            });
        }
    }
})(angular);
