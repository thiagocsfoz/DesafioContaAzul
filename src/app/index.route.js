(function() {
  'use strict';

  angular
    .module('desafioContaAzul')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/vehicle/views/list.html',
        controller: 'VehicleListController',
        controllerAs: 'vehicleListController'
      })
      .when('/add', {
        templateUrl: 'app/vehicle/views/form.html',
        controller: 'VehicleFormController',
        controllerAs: 'vehicleFormController'
      })
      .when('/edit/:plate', {
        templateUrl: 'app/vehicle/views/form.html',
        controller: 'VehicleFormController',
        controllerAs: 'vehicleFormController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
