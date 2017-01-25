(function() {
  'use strict';

  angular
    .module('desafioContaAzul')
    .controller('VehicleFormController', VehicleFormController);

  /** @ngInject */
  function VehicleFormController( BrandService, ModelService, VehicleService, $location, $routeParams, toastr, $q ) {

    //-------
    //Atributos
    //-------
    var vm = this;

    /**
     * Armazena o objeto do veículo a ser cadastrado ou alterado
     * @type {{}}
     */
    vm.vehicle = {};

    /**
     * Armazena o texto da marca utilizado no auto-complete de marca
     * @type {null}
     */
    vm.searchBrandText = "";

    /**
     * Armazena a lista de marcas utilizadas no auto-complete
     * @type {Array}
     */
    vm.brands = [];

    /**
     * Armazena o texto do modelo utilizado no autocomplete de modelo
     * @type {string}
     */
    vm.searchModelText = "";

    /**
     * Armazena a lista de modelos utilizados no auto-complete
     * @type {Array}
     */
    vm.models = [];

    /**
     * Flag que controla o botão de salvar quando é um novo veículo ou quando é alteração
     * @type {boolean}
     */
    vm.editAction = false;

    /**
     * Armazena o objeto do form para validação
     * @type {{}}
     */
    vm.form = {};

    //-------
    //Funções
    //-------

    /**
     * Realiza a consulta das marcas a cada digitação no auto-complete de marca
     * @param searchBrandText
     */
    vm.searchBrandTextChange = function ( searchBrandText ) {
      vm.brands = BrandService.listByFilter( searchBrandText );
      vm.models = ModelService.listByFilter( "", searchBrandText );

      vm.searchModelText = "";
    };

    /**
     * Realiza a consulta dos modelos a cada digitação no auto-complete de modelo
     * @param searchModelText
     */
    vm.searchModelTextChange = function ( searchModelText ) {
      vm.models = ModelService.listByFilter( searchModelText, vm.searchBrandText );
    };

    /**
     * Método que insere um novo veículo
     */
    vm.insertVehicle = function()
    {
      vm.form.$submitted = true;
      if( vm.form.$valid )
      {
        BrandService.insert( vm.searchBrandText );
        ModelService.insert( vm.searchModelText, vm.searchBrandText );

        vm.vehicle.marca = vm.searchBrandText;
        vm.vehicle.modelo = vm.searchModelText;
        if( VehicleService.insert( vm.vehicle ) != null )
        {
          toastr.success('Registro salvo com sucesso.');
          vm.go("/");
        }
      }
    };

    /**
     * Método que atualiza um novo veículo
     */
    vm.updateVehicle = function()
    {
      vm.form.$submitted = true;
      if( vm.form.$valid )
      {
        BrandService.insert( vm.searchBrandText );
        ModelService.insert( vm.searchModelText, vm.searchBrandText );

        vm.vehicle.marca = vm.searchBrandText;
        vm.vehicle.modelo = vm.searchModelText;

        if( VehicleService.update( vm.vehicle ) != null )
        {
          toastr.success('Registro salvo com sucesso.');
          vm.go("/");
        }
      }
    };

    /**
     * Método de controle de rota
     * @param go
     */
    vm.go = function( go ) {
      $location.path(go)
    };

    activate();

    /**
     * Método que realiza as instruções inicias ao acessar a rota de listagem de veículos.
     */
    function activate() {
      if( $routeParams.plate != undefined )
      {
        vm.vehicle = VehicleService.findByPlate( $routeParams.plate );

        if( vm.vehicle == null )
          vm.go("/");

        vm.searchBrandText = vm.vehicle.marca;
        vm.searchModelText = vm.vehicle.modelo;
        vm.editAction = true;
      }
      else
      {
        vm.vehicle = new Vehicle();
        vm.editAction = false;
      }
    }
  }
})();
