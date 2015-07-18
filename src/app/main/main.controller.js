"use strict";

angular.module("dagame").
  controller("MainCtrl",function ($scope,recognition) {
    recognition.start(function (event) {
      $scope.event = event;
    });
  });
