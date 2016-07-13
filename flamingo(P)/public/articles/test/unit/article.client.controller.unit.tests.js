describe('Testing Articles Contronller', function() {
  var _scope, ArticlesController;

  beforeEach(function () {
    module('mean');

    jasmine.addMatchers({
      toEqualData:function (util, customEualityTesters) {
        return{
          compare:function (actual, expected) {
            return{
              pass:angular.equals(actual, expected)
            };
          }
        };
      }
    });

    inject(function ($rootScope, $controller) {
      _scope = $rootScope.$new();
      ArticlesController = $controller('ArticlesController',{
        $scope:_scope
      });
    });
  });

  it('Should have a find method that uses $resource to retrieve a list of articles',
    inject(function(Article){
      inject(function($httpBackend){
        var sampleArticle = new Article({
          title:'An article about MEAN',
          content:'MEAN rocks'
        });
        var sampleArticles = [sampleArticle];

        $httpBackend.expectGET('api/articles').respond(sampleArticle);

        _scope.find();
        $httpBacked.flush();

        expect(_scope.articles).toEqualData(sampleArticles);
      });
    }));

    it('Should have a findOne method that uses $resource to retrieve a single of article',
    inject(function ($httpBackend, $routeParams) {
      var sampleArticles = new Articles({
        title:'An Article about MEAN',
        content:'MEAN rocks'
      });

      $routeParams.articleId = 'abcdef12345678';

      $httpBackend.expectGET(/api\/article\/([0-9a-fA-F]{24}) $/).respond(sampleArticles);

      _scope.findOne();
      $httpBackend.flush();

      expect(_scope.articles).toEqualData(sampleArticles);
    }));
});
