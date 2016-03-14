(function (angular, undefined) {
    'use strict';

    //TODO: Redirecionar para index se usuário não estiver logado
    
    angular.module('usuariosControllers', [])
        .controller('UsuariosController', UsuariosController);

	UsuariosController.$inject = ['$http', '$window'];

    function UsuariosController($http, $window) {
        var vm = this;      

        $http.get('/api/v1/usuarios')
        .success(function (response){               
        	vm.usuarios = response;
        })
        .error(function (response) {
            $window.alert(JSON.stringify(response));
        });

    }
})(angular);
