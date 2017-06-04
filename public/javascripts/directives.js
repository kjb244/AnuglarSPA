

app.directive("chapterTitleDir", function(ajaxFetch) {
  return {
    restrict: "EA", //E = element, A = attribute, C = class, M = comment
    scope: true,
    template: [
      '<section>',
            '<div class="row">',
                '<div class="small-12 columns">',
                  '<ul>',
                    '<li ng-repeat="item in listItems"  ng-class="{bold: $index <= pos}" >',
                      '{{ item }}',
                    '</li>',
                  '</ul>',
                '</div>',
              '</div>',
        "</section>"
    ].join(""),

    link: function($scope, element, attrs) {
      ajaxFetch.getData().then(function(res) {
        var index = 'chapter 3';
        $scope.pos = $scope.listItems.indexOf(index);

      });
    },
    controller: function($scope) {
      $scope.listItems = ['chapter 1', 'chapter 2', 'chapter 3', 'chapter 4', 'chapter 5', 'chapter 6'];
      $scope.pos = -1;
    }
  };
});


app.directive("chapterSummaryDir", function(ajaxFetch) {
  return {
    restrict: "EA", //E = element, A = attribute, C = class, M = comment
    scope: true,
    template: [
      '<div ng-init="showSpinner=true" ng-show="showSpinner" class="row">',
        '<div class="small-12 columns">',
            '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>',
        "</div>",
      "</div>",
      '<section>',
            '<div class="row">',
                '<div class="small-12 columns">',
                  '<div ng-show="pos==0">',
                    '<h3>Test 1</h3>',
                    '<p>kevin</p>',
                    '<a class="button">Click me</a>',
                  '</div>',
                    '<div ng-show="pos==1">',
                    '<h3>Test 2</h3>',
                    '<p>kevin</p>',
                    '<a class="button">Click me</a>',
                  '</div>',
                '</div>',
              '</div>',
        "</section>"
    ].join(""),

    link: function($scope, element, attrs) {
      ajaxFetch.getData().then(function(res) {
        $scope.pos = 1;
        $scope.showSpinner = false;

      });
    },
    controller: function($scope) {

      $scope.pos = -1;
    }
  };
});


app.directive("chapterOneSectionOneDir", function(ajaxFetch) {
  return {
    restrict: "EA", //E = element, A = attribute, C = class, M = comment
    scope: true,
    template: [
      '<div ng-init="showSpinner=true" ng-show="showSpinner" class="row">',
        '<div class="small-12 columns">',
            '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>',
        "</div>",
      "</div>",
      '<form ng-show="!showSpinner" name="chapterForm">',
            '<h3>First</h3>',
            '<div class="row">',
                '<div class="small-12 columns">',
                    '<input type="text" name="firstname" placeholder="firstname" ng-model="form.firstname" />',
                "</div>",
            "</div>",
            '<div class="row">',
                '<div class="small-12 columns">',
                    '<input type="text" name="lastname" placeholder="lastname" ng-model="form.lastname"/>',
                "</div>",
            "</div>",
            '<a href="javascript:void(0)" class="button" ng-click="clickSubmit()">Submit</a>',
            '<span ng-if="submitClick" ng-init="directiveClickSubmit(nextRoute)"></span>',
        "</form>"
    ].join(""),

    link: function($scope, element, attrs) {
      ajaxFetch.getData($scope.currRoute.init).then(function(res) {
        $scope.form = res.data[0];
        $scope.showSpinner = false;
      });
    },
    controller: function($scope) {
      $scope.clickSubmit = function() {
        ajaxFetch.getData($scope.currRoute.submit, 'POST', $scope.form).then(function(res){
          if (res.data.isValid){
            $scope.nextRoute = res.data.nextRoute;
            $scope.submitClick = true;
          }
        });
        
      };
    }
  };
});

app.directive("chapterOneSectionTwoDir", function(ajaxFetch) {
  return {
    restrict: "EA", //E = element, A = attribute, C = class, M = comment
    scope: true,
    template: [
      '<div ng-init="showSpinner=true" ng-show="showSpinner" class="row">',
        '<div class="small-12 columns">',
            '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>',
        "</div>",
      "</div>",
      '<section ng-show="!showSpinner">',
            '<h3>Second</h3>',
            '<div class="row">',
                '<div class="small-12 columns">',
                    '<input type="text" name="street" placeholder="street" ng-model="form.street" />',
                "</div>",
            "</div>",
            '<div class="row">',
                '<div class="small-12 columns">',
                    '<input type="text" name="city" placeholder="password" ng-model="form.city"/>',
                "</div>",
            "</div>",
            '<div class="row">',
                '<div class="small-12 columns">',
                    '<input type="text" name="state" placeholder="state" ng-model="form.state"/>',
                "</div>",
            "</div>",
            '<div class="row">',
                '<div class="small-12 columns">',
                    '<input type="text" name="zip" placeholder="zip" ng-model="form.zip"/>',
                "</div>",
            "</div>",
            '<a href="javascript:void(0)" class="button" ng-click="clickSubmit(\'submit\')">Submit</a>',
            '<a href="javascript:void(0)" class="button" ng-click="clickSubmit(\'back\')">Back</a>',
            '<span ng-if="submitClick" ng-init="directiveClickSubmit(nextRoute)"></span>',
            '<span ng-if="backClick" ng-init="directiveClickBack(prevRoute)"></span>',
        "</section>"
    ].join(""),

    link: function($scope, element, attrs) {
      ajaxFetch.getData($scope.currRoute.init).then(function(res) {
        $scope.form = res.data[0];
        $scope.showSpinner = false;
      });
    },
    controller: function($scope) {
      $scope.clickSubmit = function(typ) {
        if (typ === 'submit'){
          ajaxFetch.getData($scope.currRoute.submit, 'POST', $scope.form).then(function(res){
            if (res.data.isValid){
              $scope.nextRoute = res.data.nextRoute;
              $scope.submitClick = true;
            }
          });
        }
        else if (typ === 'back'){
          ajaxFetch.getData($scope.currRoute.back, 'POST', $scope.form).then(function(res){
            if (res.data.isValid){
              $scope.prevRoute = res.data.prevRoute;
              $scope.backClick = true;
            }
          });
        }

      };
    }
  };
});

app.directive("chapterOneSectionThreeDir", function(ajaxFetch) {
  return {
    restrict: "EA", //E = element, A = attribute, C = class, M = comment
    scope: true,
    template: [
      '<div ng-init="showSpinner=true" ng-show="showSpinner" class="row">',
        '<div class="small-12 columns">',
            '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>',
        "</div>",
      "</div>",
      '<section ng-show="!showSpinner">',
            '<h3>Three</h3>',
            '<div class="row">',
                '<div class="small-12 columns">',
                    '<input type="text" placeholder="veteranid" name="veteranid" ng-model="form.veteranid" />',
                "</div>",
            "</div>",
            '<div class="row">',
                '<div class="small-12 columns">',
                    '<input type="text" placeholder="startdate" name="startdate" ng-model="form.startdate"/>',
                "</div>",
            "</div>",
            '<a href="javascript:void(0)" class="button" ng-click="clickSubmit()">Back</a>',
            '<span ng-if="backClick" ng-init="directiveClickBack(prevRoute)"></span>',
        "</section>"
    ].join(""),

    link: function($scope, element, attrs) {
      ajaxFetch.getData($scope.currRoute.init).then(function(res) {
        $scope.form = res.data[0];
        $scope.showSpinner = false;
      });
    },
    controller: function($scope) {
      $scope.clickSubmit = function() {
          ajaxFetch.getData($scope.currRoute.back, 'POST', $scope.form).then(function(res){
            if (res.data.isValid){
              $scope.prevRoute = res.data.prevRoute;
              $scope.backClick = true;
            }
          });
      };
    }
  };
});