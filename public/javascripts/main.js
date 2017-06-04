var app = angular.module("myApp", ["ngRoute", "ngAnimate"]);


//routing
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

//controller for section
app.controller("ctrlSection", function($scope, ajaxFetch, utilityFunctions ) {
  //current route = false on load
  $scope.currRoute = false;

  //get route info from server
  ajaxFetch.getData('/getRoutes').then(function(res){
    $scope.routesObj = res.data;
    $scope.currRoute = $scope.routesObj.default;

  });


  //pressing either click or back on directive form
  $scope.clickSubmit = function(typ, form) {
    typ = typ || 'submit';
    form = form || {};
    

    if (typ === 'submit'){
      ajaxFetch.getData($scope.currRoute.submit, 'POST', form).then(function(res){
        if (res.data.isValid){
          $scope.currRoute = $scope.routesObj[res.data.nextRoute];
        }
      });
    }
    else if (typ === 'back'){
      ajaxFetch.getData($scope.currRoute.back, 'POST', form).then(function(res){
        if (res.data.isValid){
          $scope.currRoute = $scope.routesObj[res.data.prevRoute];
        }
      });
    }
  
  };




   
});


