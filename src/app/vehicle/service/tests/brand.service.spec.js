/**
 * Testes da service de marcas
 */
describe('Brand Service', function() {
  var BrandService;

  /**
   * Carrega o module desafioContaAzul
   */
  beforeEach(angular.mock.module('desafioContaAzul'));

  /**
   * Injeta o a service BrandService
   */
  beforeEach(inject(function(_BrandService_) {
    BrandService = _BrandService_;
  }));

  /**
   * Verifica se a service existe
   */
  it('should exist', function() {
    expect(BrandService).toBeDefined();
  });

  /**
   * Testes do método de consulta de marcas por filtros de nome
   */
  describe('.listByFilter()', function() {

    /**
     * Verifica se o método listByFilter() existe
     */
    it('should exist', function() {
      expect(BrandService.listByFilter).toBeDefined();
    });

    /**
     * Teste que retorna uma lista de marcas sem passar nenhum filtro
     */
    it('should return a list brands no filters', function() {
      expect(BrandService.listByFilter("")).toEqual([{nome: "Volkswagem"}]);
    });

    /**
     * Teste que retorna uma lista de marcas com valor parcial
     */
    it('should return a list brands no filters', function() {
      expect(BrandService.listByFilter("Volk")).toEqual([{nome: "Volkswagem"}]);
    });

    /**
     * Teste que retorna uma lista de marcas com o nome da marca
     */
    it('should return a list brands no filters', function() {
      expect(BrandService.listByFilter("Volkswagem")).toEqual([{nome: "Volkswagem"}]);
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
      expect(BrandService.insert).toBeDefined();
    });

    /**
     * Insere uma nova marca
     */
    it('should insert new brand', function() {
      expect(BrandService.insert("Renault")).toEqual({nome: "Renault"});
    });

    /**
     * Insere uma nova marca com um nome que ja existe
     */
    it('should insert new brand', function() {
      expect(BrandService.insert("Volkswagem")).toEqual({nome: "Volkswagem"});
      expect(BrandService.listByFilter("").length).toEqual(1);
    });

    /**
     * Insere uma nova marca com sem informar o nome
     */
    it('should insert new brand', function() {
      expect(BrandService.insert("")).toEqual(null);
    });
  });
});
