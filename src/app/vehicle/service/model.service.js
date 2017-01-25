(function() {
  'use strict';

  angular
    .module('desafioContaAzul')
    .factory('ModelService', ModelService);

  /** @ngInject */
  function ModelService() {
    var models = [{
        nome: "Gol",
        marca: "Volkswagem"
      },
      {
        nome: "Fusca",
        marca: "Volkswagem"
      },
      {
        nome: "Fox",
        marca: "Volkswagem"
      }];

    return {

      /**
       * Método que consulta modelos pelo nome e marca
       *
       * @param filter
       * @param brandName
       * @returns {Array.<*>}
       */
      listByFilter: function ( filter, brandName ) {

        if( brandName != "" )
        {
          var _this = this;
          _this.filter = filter;
          _this.brandName = brandName;

          return models.filter( function( model ){
            if ( _this.filter != undefined && _this.filter != "" )
            {
              if( model.marca == _this.brandName && ( model.nome.toLowerCase().match( new RegExp('/^.*|'+ _this.filter.toLowerCase() +'|.*$/') ) != null ) )
              {
                return model;
              }
            }
            else
            {
              if( model.marca == _this.brandName )
              {
                return model;
              }
            }
          });
        }
        else
        {
          return null;
        }

      },

      /**
       * Método que insere um novo modelo de uma marca.
       * @param brandName
       * @param modelName
       */
      insert: function( modelName, brandName ) {
        if( ( brandName != "" && brandName != null ) && ( modelName != "" && modelName != null ) )
        {
          var _this = this;
          _this.brandName = brandName;
          _this.modelName = modelName;

          var model = models.filter( function( model ){
            if( model.marca == _this.brandName && model.nome.toLowerCase() == _this.modelName.toLowerCase() )
            {
              return model;
            }
          });

          if( model == null || model.length == 0 )
          {
            model = {nome: modelName, marca: brandName};
            models.push(model);
          }
          else
          {
            model = model[0];
          }

          return model;
        }
        else
        {
          return null;
        }
      }

    };
  }
})();
