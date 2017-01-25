/**
 * Testes da service de carros
 */
describe('Vehicle Service', function() {
  var VehicleService;

  /**
   * Carrega o module desafioContaAzul
   */
  beforeEach(angular.mock.module('desafioContaAzul'));

  /**
   * Injeta o a service VehicleService
   */
  beforeEach(inject(function(_VehicleService_) {
    VehicleService = _VehicleService_;
  }));

  /**
   * Verifica se a service existe
   */
  it('should exist', function() {
    expect(VehicleService).toBeDefined();
  });

  /**
   * Testes do método de consultar de veículos por filtros de placa e combustível
   */
  describe('.listByFilters()', function() {

    /**
     * Verifica se o método listByFilters() existe
     */
    it('should exist', function() {
      expect(VehicleService.listByFilters).toBeDefined();
    });

    /**
     * Teste que retorna uma lista de veículos sem passar nenhum filtro
     */
    it('should return a list vehicles by filters without filters', function() {
      expect(VehicleService.listByFilters({plate: "", fuel: ""})).toEqual([{
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
        }]);
    });

    /**
     * Teste que retorna uma lista de veículos utilizando um filtro de placa
     */
    it('should return a list vehicles by filters plate filter', function() {
      expect(VehicleService.listByFilters({plate: "FFF", fuel: ""})).toEqual([{
        "combustivel" : "Flex",
        "imagem" : null,
        "marca" : "Volkswagem",
        "modelo" : "Gol",
        "placa" : "FFF-5498",
        "valor" : "20000"
      }]);
    });

    /**
     * Teste que retorna uma lista de veículos utilizando um filtro de combustível
     */
    it('should return a list vehicles by filters fuel filter', function() {
      expect(VehicleService.listByFilters({plate: "", fuel: "Alcool"})).toEqual([{
        "combustivel" : "Alcool",
        "imagem" : "http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg",
        "marca" : "Volkswagen",
        "modelo" : "Fusca",
        "placa" : "PAI-4121",
        "valor" : "20000"
      }]);
    });

    /**
     * Teste que retorna uma lista de veículos utilizando um filtro de combustível e placa
     */
    it('should return a list vehicles by filters fuel and plate filter', function() {
      expect(VehicleService.listByFilters({plate: "4125", fuel: "Gasolina"})).toEqual([{
        "combustivel" : "Gasolina",
        "imagem" : null,
        "marca" : "Volkswagem",
        "modelo" : "Fox",
        "placa" : "FOX-4125",
        "valor" : "20000"
      }]);
    });

    /**
     * Teste que retorna nenhum registro encontrado
     */
    it('not should return a list vehicles by filters fuel and plate filter', function() {
      expect(VehicleService.listByFilters({plate: "FFA-5643", fuel: ""})).toEqual([]);
    });
  });

  /**
   * Testes do método de remover um ou mais veículos
   */
  describe('.remove()', function() {

    /**
     * Verifica se o método remove() existe
     */
    it('should exist', function() {
      expect(VehicleService.remove).toBeDefined();
    });

    /**
     * Teste que remove passando um veículo para remoção com sucesso
     */
    it('should remove a vehicle', function() {
      VehicleService.remove([{placa: "FOX-4125"}]);

      var vehicles = VehicleService.listByFilters({plate: "", fuel: ""});

      angular.forEach(vehicles, function(vehicle){
        expect( vehicle.placa ).not.toEqual( "FOX-4125" );
      });
    });

    /**
     * Teste que remover passando uma lista de 2 veículos para remoção com sucesso.
     */
    it('should remove two vehicles', function() {
      VehicleService.remove([{placa: "FOX-4125"}, {placa: "PAI-4121"}]);

      var vehicles = VehicleService.listByFilters({plate: "", fuel: ""});

      angular.forEach(vehicles, function(vehicle){
        expect( vehicle.placa ).not.toEqual( "FOX-4125" );
        expect( vehicle.placa ).not.toEqual( "PAI-4121" );
      });
    });

    /**
     * Teste que remover todos veículos com sucesso.
     */
    it('should remove all vehicles', function() {
      VehicleService.remove([{placa: "FOX-4125"}, {placa: "PAI-4121"}, {placa: "FFF-5498"}]);

      var vehicles = VehicleService.listByFilters({plate: "", fuel: ""});

      expect( vehicles.length ).toEqual( 0 );
    });
  });

  /**
   * Testes do método de inserir um veículo
   */
  describe('.insert()', function() {

    /**
     * Verifica se o método insert() existe
     */
    it('should exist', function() {
      expect(VehicleService.insert).toBeDefined();
    });

    /**
     * Teste que insere um novo veículo com sucesso.
     */
    it('should insert new vehicle', function() {
      var vehicle = new Vehicle();
      vehicle.placa = "ATG-1111";
      vehicle.marca = "Volkswagem";
      vehicle.modelo = "Gol";

      expect( VehicleService.insert(vehicle) ).toEqual(vehicle);

      var vehicles = VehicleService.listByFilters({plate: "", fuel: ""});
      expect( vehicles.length ).toEqual( 4 );
    });

    /**
     * Teste que insere um novo veículo sem o campo placa preenchido.
     */
    it('not should insert new vehicle without field plate', function() {
      var vehicle = new Vehicle();
      vehicle.marca = "Volkswagem";
      vehicle.modelo = "Gol";

      expect( VehicleService.insert(vehicle) ).toEqual( null );

      var vehicles = VehicleService.listByFilters({plate: "", fuel: ""});
      expect( vehicles.length ).toEqual( 3 );
    });

    /**
     * Teste que insere um novo veículo sem o campo marca preenchido.
     */
    it('not should insert new vehicle without field brand', function() {
      var vehicle = new Vehicle();
      vehicle.placa = "ATG-1111";
      vehicle.modelo = "Gol";

      expect( VehicleService.insert(vehicle) ).toEqual( null );

      var vehicles = VehicleService.listByFilters({plate: "", fuel: ""});
      expect( vehicles.length ).toEqual( 3 );
    });

    /**
     * Teste que insere um novo veículo sem o campo modelo preenchido.
     */
    it('not should insert new vehicle without field model', function() {
      var vehicle = new Vehicle();
      vehicle.placa = "ATG-1111";
      vehicle.marca = "Volkswagem";

      expect( VehicleService.insert(vehicle) ).toEqual( null );

      var vehicles = VehicleService.listByFilters({plate: "", fuel: ""});
      expect( vehicles.length ).toEqual( 3 );
    });

    /**
     * Teste que insere um novo veículo com a mesma placa de um veículo existente.
     */
    it('not should insert new vehicle with the same plate', function() {
      var vehicle = new Vehicle();
      vehicle.placa = "FFF-5498";
      vehicle.marca = "Volkswagem";
      vehicle.modelo = "Gol";

      expect( VehicleService.insert(vehicle) ).toEqual( null );

      var vehicles = VehicleService.listByFilters({plate: "", fuel: ""});
      expect( vehicles.length ).toEqual( 3 );
    });
  });

  /**
   * Testes do método de atualizar um veículo
   */
  describe('.update()', function() {

    /**
     * Verifica se o método update() existe
     */
    it('should exist', function() {
      expect(VehicleService.update).toBeDefined();
    });

    /**
     * Teste que atualiza um veículo com sucesso.
     */
    it('should update a vehicle', function() {
      var vehicle = {
        "combustivel" : "Flex",
        "imagem" : null,
        "marca" : "Volkswagem",
        "modelo" : "Gol",
        "placa" : "FFF-5498",
        "valor" : "20000"
      };

      vehicle.valor = "15000";

      expect( VehicleService.update(vehicle) ).toEqual( vehicle );

      var vehicles = VehicleService.listByFilters({plate: "FFF-5498", fuel: ""});
      expect( vehicles[0].valor ).toEqual( "15000" );
    });

    /**
     * Teste que atualiza um veículo sem o campo placa preenchido.
     */
    it('not should update a vehicle without field plate', function() {
      var vehicle = {
        "combustivel" : "Flex",
        "imagem" : null,
        "marca" : "Volkswagem",
        "modelo" : "Gol",
        "valor" : "20000"
      };

      vehicle.valor = "15000";

      expect( VehicleService.update(vehicle) ).toEqual( null );

      var vehicles = VehicleService.listByFilters({plate: "FFF-5498", fuel: ""});
      expect( vehicles[0].valor ).toEqual( "20000" );
    });

    /**
     * Teste que atualiza um veículo sem o campo marca preenchido.
     */
    it('not should insert new vehicle without field brand', function() {
      var vehicle = {
        "combustivel" : "Flex",
        "imagem" : null,
        "modelo" : "Gol",
        "valor" : "20000"
      };

      vehicle.valor = "15000";

      expect( VehicleService.update(vehicle) ).toEqual( null );

      var vehicles = VehicleService.listByFilters({plate: "FFF-5498", fuel: ""});
      expect( vehicles[0].valor ).toEqual( "20000" );
    });

    /**
     * Teste que atualiza um veículo sem o campo modelo preenchido.
     */
    it('not should insert new vehicle without field model', function() {
      var vehicle = {
        "combustivel" : "Flex",
        "imagem" : null,
        "marca" : "Volkswagem",
        "modelo" : "Gol",
        "valor" : "20000"
      };

      vehicle.valor = "15000";

      expect( VehicleService.update(vehicle) ).toEqual( null );

      var vehicles = VehicleService.listByFilters({plate: "FFF-5498", fuel: ""});
      expect( vehicles[0].valor ).toEqual( "20000" );
    });

    /**
     * Testes do método de buscar um veículo pela placa
     */
    describe('.findByPlate()', function() {

      /**
       * Verifica se o método insert() existe
       */
      it('should exist', function() {
        expect( VehicleService.findByPlate ).toBeDefined();
      });

      /**
       * Teste que busca um veículo pela placa com sucesso.
       */
      it('should find veihcle', function() {
        expect( VehicleService.findByPlate("FFF-5498") ).toEqual({
          "combustivel" : "Flex",
          "imagem" : null,
          "marca" : "Volkswagem",
          "modelo" : "Gol",
          "placa" : "FFF-5498",
          "valor" : "20000"
        });
      });

      /**
       * Teste que busca um veículo pela placa de uma placa que não existe.
       */
      it('not should find veihcle', function() {
        expect( VehicleService.findByPlate("FFF-5499") ).toEqual(null);
      });
    });
  });

});
