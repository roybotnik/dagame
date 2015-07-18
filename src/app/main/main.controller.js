"use strict";

angular.module("dagame").
  controller("MainCtrl",function ($scope,recognition) {

    var startRecognition = function () {
      console.log("start");
      recognition.start(function (event) {
        $scope.event = event;
      });
    };

    var stopRecognition = function () {
      console.log("stop");
      recognition.stop();
    };

    startRecognition();

    $scope.speak = function (text) {
      if (speechSynthesis.speaking === false && speechSynthesis.pending === false) {
        var message = new SpeechSynthesisUtterance(text);

        message.addEventListener("start",function () {
          stopRecognition();
        }.bind(this),false);

        message.addEventListener("end",function () {
          startRecognition();
        }.bind(this),false);

        message.addEventListener("error",function () {
          startRecognition();
        }.bind(this),false);
        window.speechSynthesis.speak(message);
      }
    };
  });
