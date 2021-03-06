'use strict';

var karaoke = angular.module('karaokeApp', [
    'ngRoute',
    'youtube-embed'
  ]);

karaoke.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/search.html',
    controller: 'SearchCtrl'
  })
    .when('/search/:query', {
      templateUrl: 'views/search.html',
      controller: 'SearchCtrl'
    })
    .when('/sing/:songId', {
      templateUrl: 'views/sing.html',
      controller: 'SingCtrl'
    })
    .otherwise({redirectTo: '/'});
}]);

karaoke.run(function($rootScope){

  $rootScope.voice = document.querySelector('#voice');
  navigator.getUserMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      {
        video: false,
        audio: true
      },
      function (localMediaStream) {
        $rootScope.voice.src = window.URL.createObjectURL(localMediaStream);
        $rootScope.voice.volume = 0.5;
        $rootScope.voice.play();
      },
      function (err) {
        console.log('The following error occurred: ', err);
      }
    );
  } else {
    $rootScope.err = 'getUserMedia is not supported in your browser.';
  }

});

