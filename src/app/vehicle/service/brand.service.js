(function() {
  'use strict';

  angular
    .module('desafioContaAzul')
    .factory('BrandService', BrandService);

  /** @ngInject */
  function BrandService() {
    var brands = [{nome: "Volkswagem"}];

    return {

      /**
       * Método que consulta marcas pelo nome
       *
       * @param filter
       * @returns {Array.<*>}
       */
      listByFilter: function ( filter ) {
        var _this = this;
        _this.filter = filter;

        return brands.filter( function( brand ){
          if ( _this.filter != undefined && _this.filter != "" )
          {
            if( brand.nome.toLowerCase().match( new RegExp('/^.*|'+ _this.filter.toLowerCase() +'|.*$/') ) != null )
            {
              return brand;
            }
          }
          else
          {
            return brand;
          }
        });
      },

      /**
       * Método que insere uma nova marca.
       * @param brandName
       */
      insert: function( brandName ) {
        if( brandName != "" && brandName != null )
        {
          var _this = this;
          _this.brandName = brandName;
          var brand = brands.filter( function( brand ){
            if( brand.nome.toLowerCase() == _this.brandName.toLowerCase() )
            {
              return brand;
            }
          });

          if( brand == null || brand.length == 0 )
          {
            brand = {nome: brandName};
            brands.push(brand);
          }
          else
          {
            brand = brand[0];
          }

          return brand;
        }
        else
        {
          return null;
        }
      }
    };
  }
})();
