(function() {
  'use strict';

  angular
    .module('desafioContaAzul')
    .controller('VehicleListController', VehicleListController);

  /** @ngInject */
  function VehicleListController(VehicleService, $mdDialog, toastr, $location, $document) {

    //-------
    //Atributos
    //-------

    var vm = this;

    /**
     * Armazena os veículos retornados na consulta de veículos por filtros
     * @type {Array}
     */
    vm.vehicles = [];

    /**
     * Armazena os veículos selecionados na table
     * @type {Array}
     */
    vm.itensSelected = [];

    /**
     * Objeto que realizado o controle da paginação
     * @type {{order: string, limit: number, page: number}}
     */
    vm.query = {
      order: 'placa',
      limit: 5,
      page: 1,
      totalPages: 1
    };

    /**
     * Armazena os filtros realizados na consulta
     * @type {{plate: string, fuel: string}}
     */
    vm.filters = {
      plate: "",
      fuel: ""
    };

    /**
     * Flag para controle de exibição das opções avançadas de busca
     * @type {boolean}
     */
    vm.advancedSearch = false;

    //-------
    //Funções
    //-------

    /**
     * Método que realiza a busca por click no botão de busca simples
     */
    vm.search = function() {
      vm.listByFilters( vm.filters );
    };

    /**
     * Método que realiza busca pelo acionamento do botão enter
     * @param event
     */
    vm.textSearchKeypress = function( event ) {
      if( event.keyCode == 13 )
      {
        vm.listByFilters( vm.filters );
      }
    };

    /**
     * Método que realiza a consulta dos veículos por filtros
     */
    vm.listByFilters = function( filters ) {
      vm.vehicles = VehicleService.listByFilters( filters );
    };

    /**
     * Método que abre as opções de busca avançada
     */
    vm.showAdvancedSearch = function() {
      vm.advancedSearch = true;
    };

    /**
     * Método que fecha as opções de busca avançada
     */
    vm.closeAdvancedSearch = function() {
      vm.advancedSearch = false;
    };

    /**
     * Método que realiza a exibição da imagem de um veículo
     */
    vm.showImage = function( ev, image ) {
      $mdDialog.show({
        controller: VehicleListController,
        template: "<img src='"+ image +"'>",
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    /**
     * Método que remove um ou mais veículo selecionados
     */
    vm.removeVehicle = function( ev ) {
      if( vm.itensSelected.length > 0 )
      {
        var confirm = $mdDialog.confirm()
          .title('Deseja realmente excluir esse(s) registro(s)??')
          .textContent('Não será possível restaurá-lo(s) posteriormente.')
          .targetEvent(ev)
          .ok('Sim')
          .cancel('Não');

        $mdDialog.show(confirm).then(function() {
          VehicleService.remove( vm.itensSelected, function(){
              vm.itensSelected = [];
              vm.listByFilters( vm.filters );
              toastr.success('Registro(s) excluído(s) com sucesso.');
            },
            function( error ) {
              toastr.error( error );
            });
        });
      }
      else
      {
        toastr.info('Nenhum registro foi selecionado para exclusão.');
      }
    };

    /**
     * Método para a alterar a página a ser exibida na table de veículos
     */
    vm.goToPage = function( page ) {
      if( vm.query.page != page && vm.query.totalPages >= page && page >= 1 )
      {
        vm.query.page = page;
      }
    };

    /**
     * Método que lista a quantidade de páginas para navegação
     * @param max
     * @param step
     * @returns {Array}
     */
    vm.range = function( max, step ) {
      step = step || 1;
      var input = [];
      for (var i = 1; i <= max; i += step) {
        input.push(i);
      }
      return input;
    };

    /**
     * Meétodo utilizado para navegar entre as rotas
     * @param go
     */
    vm.go = function( go ) {
      $location.path(go)
    };

    /**
     * Método que realiza as instruções inicias ao acessar a rota de listagem de veículos.
     */
    function activate() {
      vm.advancedSearch = false;
      vm.listByFilters();

      vm.query.totalPages = Math.trunc(vm.vehicles.length/vm.query.limit);
      if(vm.query.totalPages == 0)
        vm.query.totalPages = 1;
    }

    activate();
  }
})();
