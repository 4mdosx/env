var mainApplicationModuleName = 'mean';

var mainApplicationModule =  angular.module(mainApplicationModuleName,['ngResource','ngRoute','users','example']);

//配置URL模式 支持的爬虫会等到Ajax加载完成后开始抓取
mainApplicationModule.config(['$locationProvider',
  function($locationProvider){
    $locationProvider.hashPrefix('!');
  }
]);

if(window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
  angular.bootstrap(document,[mainApplicationModuleName]);
});
