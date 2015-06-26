var myAppModule = angular.module('myApp', ['ui.router']);

myAppModule.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
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
        
});