var app = angular.module("myApp", ["ngRoute", "ngAnimate"]);



app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "index"
    })
    .when("/chaptertitle", {
        templateUrl : "partials/chapter-title"
    })
    .when("/chaptersection", {
        templateUrl : "partials/chapter-section"
    });
});



app.controller("ctrlTitle", function($scope) {

});

app.controller("ctrlSection", function($scope, ajaxFetch, utilityFunctions ) {
  $scope.currRoute = false;

  ajaxFetch.getData('/getRoutes').then(function(res){
    $scope.routesObj = res.data;
    $scope.currRoute = $scope.routesObj.default;


  });


  $scope.directiveClickSubmit = function(nextRoute){
    $scope.currRoute = $scope.routesObj[nextRoute];
 

  }

  $scope.directiveClickBack = function(prevRoute){
    $scope.currRoute = $scope.routesObj[prevRoute];
 

  }


   
});


