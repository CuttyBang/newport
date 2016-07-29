(function(){

  var app = angular.module('myPortfolio', ['ngRoute', 'ngAnimate'])
  .constant('TweenMax', TweenMax);
  app.config(function($routeProvider) {
    $routeProvider
      .when("/", {
          templateUrl: "assets/templates/home.html",
          controller: "viewCtrl"
      })
      .when("/portfolio", {
        templateUrl: "assets/templates/portfolio.html",
        controller: "viewCtrl"
      })
      .when("/contact", {
        templateUrl: "assets/templates/contact.html",
        controller: "viewCtrl"
      })
      .when("/other-stuff", {
        templateUrl: "assets/templates/other-stuff.html",
        controller: "viewCtrl"
      })
      .when("/portfolio/spacey", {
        templateUrl: "assets/templates/portfolio/spacey.html",
        controller: "viewCtrl"
      })
      .when("/portfolio/dante", {
        templateUrl: "assets/templates/portfolio/dante.html",
        controller: "viewCtrl"
      })
      .when("/portfolio/cloudbrowse", {
        templateUrl: "assets/templates/portfolio/cloudbrowse.html",
        controller: "viewCtrl"
      })
      .when("/portfolio/flickeroo", {
        templateUrl: "assets/templates/portfolio/flickeroo.html",
        controller: "viewCtrl"
      })
      .when("/portfolio/tubesearch", {
        templateUrl: "assets/templates/portfolio/tubesearch.html",
        controller: "viewCtrl"
      })
      .when("/portfolio/tacklr", {
        templateUrl: "assets/templates/portfolio/tacklr.html",
        controller: "viewCtrl"
      })
      .otherwise({
          redirectTo: "/"
      })
      .when('/error', {
          template: '<p>Error Page Not Found</p>'
      });
    });




  app.controller('viewCtrl', function($scope){
    $scope.views = {};
  });


  app.controller('portCtrl', function($scope, $routeParams){
    $scope.pages = {
      'spacey': {
        label: 'Spacey!',
        desc: 'Web Audio and Canvas APIs along with a bit of physics to illustrate gravity with sound.',
        url: '#/portfolio/spacey'
      },
      'dante': {
        label: 'Dante Quiz',
        desc: 'A simple quiz app that employs user input validation and comparison. With a bit of VelocityJS for looks.',
        url: '#/portfolio/dante',

      },
      'cloudbrowse': {
        label: 'CloudBrowse',
        desc: 'Easily find samples under "creative-commons share alike" licence on Soundcloud using the Soundcloud API.',
        url: '#/portfolio/cloudbrowse'
      },
      'flickeroo':{
        label: 'Flickroo',
        desc: 'A web app to find background images on Flickr for mobile, tablet or desktop. Flickr API',
        url: '#/portfolio/flickeroo'

      },
      'tubesearch':{
        label: 'Tubesearch',
        desc: 'API hack to find acapellas on YouTube.',
        url: '#/portfolio/tubesearch'

      },
      'tacklr':{
        label: 'Tacklr',
        desc: 'Routing and resource location app. Featuring Angular, Google Maps API, and Ionic Framework.',
        url: '#/portfolio/tacklr'
      }
    };
    $scope.currentPage = 'spacey';
    $scope.page = $scope.pages['spacey'];
    $scope.isInTransit = false;

    $scope.isCurrentPage = function(page){
      return $scope.currentPage === page;
    };

    $scope.getCurrentPage = function () {
  		return $scope.currentPage;
  	};

    $scope.setCurrentPage = function(page){
      if($scope.currentPage !== page){
        $scope.page = $scope.pages[page];
        $scope.currentPage = page;
        $scope.isInTransit = true;
      }
    };
    $scope.$on('bgTransitionComplete', function(){
      $scope.isInTransit = false;
    });
  });

  app.animation('.panel-animation', function(){
    return {
      addClass: function(element, className, done){
        if(className == 'ng-hide'){
          TweenMax.to(element, 0.2, {opacity:0, onComplete: done});
        }else{
          done();
        }
      },
      removeClass: function(element, className, done){
        if(className == 'ng-hide'){
          element.removeClass('ng-hide');
          TweenMax.fromTo(element, 0.5,
          {opacity: 0, left: -100},
          {opacity: 1, left:0, onComplete: done});
        }else{
          done();
        }
      }
    };
  });

  app.animation('.bg-animation', function($window, $rootScope){
    return {
      enter: function(element, done){
        TweenMax.fromTo(element, 0.5,
          {left: window.innerWidth},
          {left: 0, onComplete: function(){
            $rootScope.$apply(function(){
              $rootScope.$broadcast('bgTransitionComplete');
            });
            done();
          }});
      },
      leave: function(element, done){
        TweenMax.to(element, 0.5, {left: -$window.innerWidth, onComplete: done});
      }
    };
  });

  app.directive('bg', function ($window) {
      return function (scope, element, attrs) {
        var resizeBG = function () {
          var bgwidth = element.width();
          var bgheight = element.height();

          var winwidth = $window.innerWidth;
          var winheight = $window.innerHeight;

          var widthratio = winwidth / bgwidth;
          var heightratio = winheight / bgheight;

          var widthdiff = heightratio * bgwidth;
          var heightdiff = widthratio * bgheight;

          if (heightdiff > winheight) {
            element.css({
              width: winwidth + 'px',
              height: heightdiff + 'px'
            });
          } else {
            element.css({
              width: widthdiff + 'px',
              height: winheight + 'px'
            });
          }
        };

        var windowElement = angular.element($window);
        windowElement.resize(resizeBG);

        element.bind('load', function () {
          resizeBG();
        });
      };
    });


  /*var pages = {
    'spacey': {
      label: 'Spacey!',
      desc: 'Web Audio and Canvas APIs along with a bit of physics to illustrate gravity with sound.',
      url: 'assets/templates/spacey.html'
    },
    'dante': {
      label: 'Dante Quiz',
      desc: 'A simple quiz app that employs user input validation and comparison. With a bit of VelocityJS for looks.',
      url: 'assets/templates/dante.html'
    },
    'cloudbrowse': {
      label: 'CloudBrowse',
      desc: 'Easily find samples under "creative-commons share alike" licence on Soundcloud using the Soundcloud API.',
      url: 'assets/templates/cloudbrowse.html'
    },
    'flickeroo':{
      label: 'Flickroo',
      desc: 'A web app to find background images on Flickr for mobile, tablet or desktop. Flickr API',
      url: 'assets/templates/flickeroo.html'

    },
    'tubesearch':{
      label: 'Tubesearch',
      desc: 'API hack to find acapellas on YouTube.',
      url: 'assets/templates/tubesearch.html'

    },
    'tacklr':{
      label: 'Tacklr',
      desc: 'Routing and resource location app. Featuring Angular, Google Maps API, and Ionic Framework.',
      url: 'assets/templates/tubesearch.html'
    }
  };
*/

/*
  $.localScroll(600, {offset: 100});

  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene({
    triggerElement: '#trigger1'
  })
  .setVelocity('#cutty', {top: 50}, {duration: 500})
  .setVelocity('#cutty', {scale: 1.5}, {duration: 500})
  .addTo(controller);

  var end = new ScrollMagic.Scene({
    triggerElement: '#trigger2'
  })
  .setVelocity('#cutty', 'callout.bounce')
  .addTo(controller);

  function delayEvent(elem, timeout){
    setTimeout(elem, timeout);
  }
*/
})(jQuery);
