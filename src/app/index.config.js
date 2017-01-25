(function() {
  'use strict';

  angular
    .module('desafioContaAzul')
    .config(config);

  /** @ngInject */
  function config( $mdThemingProvider ) {

    //-------
    //CONFIGURAÇÕES DE TEMA
    //-
    $mdThemingProvider.definePalette('contaAzul', {
      '50': 'FFFFFF',
      '100': '4ABA58',
      '200': 'EEEEEE',
      '300': '4FC3F7',
      '400': '2687E9',
      '500': '03A9F4',
      '600': '039BE5',
      '700': '0288D1',
      '800': '0277BD',
      '900': '4ABA58',
      'A100': 'E0E0E0',
      'A200': '40C4FF',
      'A400': '00B0FF',
      'A700': '0091EA'
    });

    $mdThemingProvider.definePalette('buttonsPalette', {
      '50': '4ABA58',
      '100': '03A9F4',
      '200': 'EEEEEE',
      '300': '4FC3F7',
      '400': '2687E9',
      '500': '03A9F4',
      '600': '039BE5',
      '700': '0288D1',
      '800': '0277BD',
      '900': '01579B',
      'A100': 'E0E0E0',
      'A200': '40C4FF',
      'A400': '00B0FF',
      'A700': '0091EA'
    });

    $mdThemingProvider.definePalette('backgroundPalette', {
      '50': 'F1F4F9',
      '100': 'F1F4F9',
      '200': 'F1F4F9',
      '300': '4FC3F7',
      '400': '29B6F6',
      '500': '03A9F4',
      '600': '039BE5',
      '700': '0288D1',
      '800': '0277BD',
      '900': '01579B',
      'A100': 'FFFFFF',
      'A200': '40C4FF',
      'A400': '00B0FF',
      'A700': '0091EA'
    });

    /**
     * Paleta de cores padrão do sistema
     */
    $mdThemingProvider.theme('default')
      .primaryPalette('contaAzul', {
        'default': '400',
        'hue-1': '600',
        'hue-2': '900',
        'hue-3': 'A100'
      })
      .accentPalette('buttonsPalette', {
        'default': '50',
        'hue-1': '100',
        'hue-2': '400',
        'hue-3': '300'
      })
      .backgroundPalette('backgroundPalette', {
        'default': '50',
        'hue-1': '100',
        'hue-2': '200',
        'hue-3': 'A100'
      });
  }

})();
