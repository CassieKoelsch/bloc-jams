var myAppModule = angular.module('myApp', ['ui.router']);

myAppModule.config(['$locationProvider','$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    

    $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'views/landing.html'
        })
        
        // COLLECTION PAGE =================================
        .state('collection', {
            url: '/collection',
            templateUrl: 'views/collection.html'     
        });
        
    
     $urlRouterProvider.otherwise('/');
}]);