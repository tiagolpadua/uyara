(function(angular, undefined) {
    'use strict';

    angular.module('indexControllers', ['indexServices'])
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$http', '$location', '$window', 'LoginService'];

    function IndexController($http, $location, $window, LoginService) {
        var vm = this;

        vm.ambientes = [
            {
                nome: 'Desenvolvimento',
                urlBase: 'https://plataforma.desenv.bb.com.br'
            },
            {
                nome: 'Homologação',
                urlBase: 'https://plataforma.hm.bb.com.br'
            },
            {
                nome: 'Piloto',
                urlBase: 'https://plataforma.piloto.bb.com.br'
            },
            {
                nome: 'Produção',
                urlBase: 'https://plataforma.atendimento.bb.com.br'
            }
        ];

        vm.contextos = ['/acc/APPS', '/gaw/APPS', '/coc/APPS'];

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
