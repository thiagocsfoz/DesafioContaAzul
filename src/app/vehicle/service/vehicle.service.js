(function() {
  'use strict';

  angular
    .module('desafioContaAzul')
    .factory('VehicleService', VehicleService);

  /** @ngInject */
  function VehicleService(toastr) {
    var vehicles = [{
      "combustivel" : "Flex",
      "imagem" : null,
      "marca" : "Volkswagem",
      "modelo" : "Gol",
      "placa" : "FFF-5498",
      "valor" : "20000"
    },
    {
      "combustivel" : "Gasolina",
      "imagem" : null,
      "marca" : "Volkswagem",
      "modelo" : "Fox",
      "placa" : "FOX-4125",
      "valor" : "20000"

    },
    {
      "combustivel" : "Alcool",
      "imagem" : "http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg",
      "marca" : "Volkswagen",
      "modelo" : "Fusca",
      "placa" : "PAI-4121",
      "valor" : "20000"
    }];

    return {

      /**
       * Método que consulta veículos pelos filtros de placa e combustível
       *
       * @param filters
       * @returns {Array.<*>}
       */
      listByFilters: function ( filters ) {
        var _this = this;
        _this.filters = filters;

        return vehicles.filter( function( vehicle ){
          if ( _this.filters != undefined && ( ( _this.filters.plate != "" || _this.filters.plate != undefined ) || ( _this.filters.fuel != "" || _this.filters.fuel != undefined ) ) )
          {
            if( ( vehicle.placa.toLowerCase().match( new RegExp('/^.*|'+ _this.filters.plate.toLowerCase() +'|.*$/') ) != null ) && ( _this.filters.fuel == "" || vehicle.combustivel.toLowerCase() == _this.filters.fuel.toLowerCase() ) )
            {
              return vehicle;
            }
          }
          else
          {
            return vehicle;
          }
        });
      },

      /**
       * Método que insere um novo veículo.
       * @param vehicle
       */
      insert: function( vehicle ) {

        if( vehicle.placa == null || vehicle.placa == "" )
        {
          toastr.error("Campo placa é obrigatório.");
          return null;
        }

        var _this = this;
        _this.plate = vehicle.placa;

        var result = vehicles.filter(function( vehicle ){
          if( _this.plate.toLowerCase() == vehicle.placa.toLowerCase() )
          {
            return vehicle;
          }
        });

        if( result.length > 0 )
        {
          toastr.error("Já existe um veículo cadastrado com essa placa.");
          return null;
        }

        if( vehicle.marca == null || vehicle.marca == "" )
        {
          toastr.error("Campo marca é obrigatório.");
          return null;
        }

        if( vehicle.modelo == null || vehicle.modelo == "" )
        {
          toastr.error("Campo modelo é obrigatório.");
          return null;
        }

        vehicles.push(vehicle);

        return vehicles[vehicles.length - 1];
      },

      /**
       * Método que alterar um veículo.
       * @param vehicle
       */
      update: function( vehicle ) {
        if( vehicle.placa == null || vehicle.placa == "" )
        {
          toastr.error("Campo placa é obrigatório.");
          return null;
        }

        if( vehicle.marca == null || vehicle.marca == "" )
        {
          toastr.error("Campo marca é obrigatório.");
          return null;
        }

        if( vehicle.modelo == null || vehicle.modelo == "" )
        {
          toastr.error("Campo modelo é obrigatório.");
          return null;
        }

        var _this = this;
        _this.plate = vehicle.placa;
        _this.indexOf = -1;

        vehicles.filter(function( vehicle, index ){
          if( _this.plate == vehicle.placa )
          {
            _this.indexOf = index;
          }
        });

        vehicles[_this.indexOf] = vehicle;

        return vehicles[_this.indexOf];
      },

      /**
       * Método que remove um veículo.
       * @param plate
       */
      remove: function( itensSelected, success, error ) {
        var _this = this;
        _this.totalItensRemoved = 0;

        angular.forEach( itensSelected, function( vehicle ){
          _this.plate = vehicle.placa;
          _this.indexOf = -1;

          vehicles.filter(function( vehicle, index ){
            if( _this.plate == vehicle.placa )
            {
              _this.indexOf = index;
              return vehicle;
            }
          });

          if( _this.indexOf != -1 )
          {
            vehicles.splice(_this.indexOf, 1);
            _this.totalItensRemoved++;
          }
          else
          {
            if( error != undefined )
              error("Registro não encontrado " + vehicle.placa);
          }
        });


        if( _this.totalItensRemoved == itensSelected.length )
        {
          if( success != undefined )
            success();
        }
        else
        {
          if( error != undefined )
            error("Não foi possível remover um ou mais registros.");
        }
      },

      /**
       * Método que busca um veículo pela placa
       */
      findByPlate: function( plate ) {
        var _this = this;
        _this.plate = plate;

        var vehicle = vehicles.filter(function( vehicle ){
          if( _this.plate == vehicle.placa )
          {
            return vehicle;
          }
        });

        if( vehicle.length == 1 )
        {
          return vehicle[0];
        }
        else
        {
          toastr.error("Veículo com a placa " + plate + " não foi encontrado.");
          return null;
        }
      }
    };
  }
})();
