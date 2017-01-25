/**
 * Testes da service de modelos de uma marca
 */
describe('Model Service', function() {
  var ModelService;

  /**
   * Carrega o module desafioContaAzul
   */
  beforeEach(angular.mock.module('desafioContaAzul'));

  /**
   * Injeta o a service ModelService
   */
  beforeEach(inject(function(_ModelService_) {
    ModelService = _ModelService_;
  }));

  /**
   * Verifica se a service existe
   */
  it('should exist', function() {
    expect(ModelService).toBeDefined();
  });

  /**
   * Testes do método de consulta de modelos por filtros de nome e marca
   */
  describe('.listByFilter()', function() {

    /**
     * Verifica se o método listByFilter() existe
     */
    it('should exist', function() {
      expect(ModelService.listByFilter).toBeDefined();
    });

    /**
     * Teste que retorna uma lista de modelos sem passar nenhum filtro da marca Volkswagem
     */
    it('should return a list models no filters', function() {
      expect(ModelService.listByFilter("", "Volkswagem")).toEqual([
        {
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
        }]);
    });

    /**
     * Teste que retorna uma lista de marcas com valor parcial
     */
    it('should return a list models parcial value', function() {
      expect(ModelService.listByFilter("Fus", "Volkswagem")).toEqual([
        {
          nome: "Fusca",
          marca: "Volkswagem"
        }]);
    });

    /**
     * Teste que retorna uma lista de marcas com o nome da marca
     */
    it('should return a list models', function() {
      expect(ModelService.listByFilter("Fox","Volkswagem")).toEqual([
        {
          nome: "Fox",
          marca: "Volkswagem"
        }]);
    });

  });

  /**
   * Testes de inserir uma nova marca
   */
  describe('.insert()', function() {

    /**
     * Verifica se o método insert() existe
     */
    it('should exist', function() {
      expect(ModelService.insert).toBeDefined();
    });

    /**
     * Insere uma nova marca
     */
    it('should insert new model', function() {
      expect(ModelService.insert("Golf", "Volkswagem")).toEqual({nome: "Golf", marca: "Volkswagem"});
      expect(ModelService.listByFilter("").length).toEqual(4);
    });

    /**
     * Insere uma nova marca com um nome que ja existe
     */
    it('should insert new brand some name', function() {
      expect(ModelService.insert("Gol", "Volkswagem")).toEqual({nome: "Gol", marca: "Volkswagem"});
      expect(ModelService.listByFilter("").length).toEqual(3);
    });

    /**
     * Insere uma nova marca com sem informar o nome e marca
     */
    it('should insert new brand without informing nome and marca', function() {
      expect(ModelService.insert("", "")).toEqual(null);
    });
  });
});
