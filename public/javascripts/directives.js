

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

app.directive("houseProgressDir", function(){
  return{
    restrict: "EA",
    scope: {
      progress: "="
    },
    templateUrl: 'directive_templates/house-progress.html',
    link: function(scope, element, attrs) {
      scope.$watch('progress', function(newValue, oldValue){
        newValue = newValue || 0;
        angular.element(element[0].querySelector('.structure-fill')).css('height', newValue + "px");
      });
      
    }
  };

});


app.directive("chapterOneSectionOneDir", function(ajaxFetch) {
  return {
    restrict: "EA", //E = element, A = attribute, C = class, M = comment
    scope: true,
    templateUrl: 'directive_templates/chapter-one-section-one.html',

    link: function($scope, element, attrs) {
      ajaxFetch.getData($scope.currRoute.init).then(function(res) {
        $scope.form = res.data[0];
        $scope.showSpinner = false;
      });
    }
  };
});

app.directive("chapterOneSectionTwoDir", function(ajaxFetch) {
  return {
    restrict: "EA", //E = element, A = attribute, C = class, M = comment
    scope: true,
    templateUrl: 'directive_templates/chapter-one-section-two.html',

    link: function($scope, element, attrs) {
      ajaxFetch.getData($scope.currRoute.init).then(function(res) {
        $scope.form = res.data[0];
        $scope.showSpinner = false;
      });
    }
  };
});

app.directive("chapterOneSectionThreeDir", function(ajaxFetch) {
  return {
    restrict: "EA", //E = element, A = attribute, C = class, M = comment
    scope: true,
    templateUrl: 'directive_templates/chapter-one-section-three.html',

    link: function($scope, element, attrs) {
      ajaxFetch.getData($scope.currRoute.init).then(function(res) {
        $scope.form = res.data[0];
        $scope.showSpinner = false;
      });
    }
    
  };
});