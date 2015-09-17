// app.js

// define our application and pull in ngRoute and ngAnimate
var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
animateApp.config(function ($routeProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'page-home.html',
            controller: 'mainController'
        })

        // about page
        .when('/about', {
            templateUrl: 'directions.html',
            controller: 'aboutController'
        })
    
     // about page
        .when('/direction', {
            templateUrl: 'directions.html',
            controller: 'dirController'
        })

        // contact page
        .when('/contact', {
            templateUrl: 'register.html',
            controller: 'contactController'
        });

});


// CONTROLLERS ============================================
// home page controller
animateApp.controller('mainController', function ($scope) {
    $scope.pageClass = 'page-home';
});

// about page controller
animateApp.controller('aboutController', function ($scope) {
    $scope.pageClass = 'directions';
});

// about dir controller
animateApp.controller('dirController', function ($scope) {
    $scope.pageClass = 'directions';
});

// contact page controller
animateApp.controller('contactController', function ($scope) {
    $scope.pageClass = 'page-contact';
});



var AddressBook = angular.module('AddressBook', []);

AddressBook.controller('PersonController', function ($scope) {
  
});

//maps



function LoginController($scope) {
    
    $scope.logins = [];
    $scope.login = function (user, pwd) {
        localStorage.setItem("name" , user);
        
        window.location = "directions.html";
       
    };
    
}





    
          
   /* google.maps.event.addDomListener(window, 'load', $scope.initialize);

});*/