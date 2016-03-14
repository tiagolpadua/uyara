(function (angular, undefined) {
    'use strict';

    //TODO: Redirecionar para index se usuário não estiver logado
    
    angular.module('painelControllers', [])
        .controller('PainelController', PainelController);

	PainelController.$inject = [];

    function PainelController() {
        var vm = this;        
    }
})(angular);
