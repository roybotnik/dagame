"use strict";

angular.module("dagame").
  factory("recognition",function ($rootScope) {
    return {
      getRecognition : function () {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        return recognition;
      },
      start : function (callback) {
        this.recognition = this.getRecognition();
        this.recognition.onresult = function (event) { 
          $rootScope.$apply(function () {
            var result = event.results[event.resultIndex];
            console.log(result[0].transcript);
            callback(result[0].transcript);
          }.bind(this));
        }.bind(this);
        this.recognition.start();
      },
      stop : function () {
        if (this.recognition) {
          this.recognition.stop();
          delete this.recognition;
        }
      }
    };
  });
