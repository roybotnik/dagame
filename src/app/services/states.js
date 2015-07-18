"use strict";

angular.module("dagame").
  factory("States",function () {
    var States = function (handlePhrase) {
      this.handlePhrase = handlePhrase;
      this.currentState = this.defaultState;
    };

    angular.extend(States.prototype,{
      processText : function (text) {
        var possibleState;
        for (var index = 0; index < this.currentState.states.length; index++) {
          possibleState = this.currentState.states[index];
          if (text.indexOf(possibleState.key) !== -1) {
            return this.setCurrentState(possibleState);
          }
        }
      },
      setCurrentState : function (state) {
        console.log("setting state",state);
        this.currentState = state;
        if (state.phrase) {
          this.handlePhrase(state.phrase);
        }
        if (state.after) {
          this.currentState = this.getState(state.after);
        }
      },
      getState : function (stateName) {
        if (stateName === "defaultState") {
          return this.defaultState;
        } else {
          debugger;
        }
      },
      defaultState : {
        states : [
          {
            key : "what",
            states : [
              {
                key : "name",
                phrase : "shitbad",
                after : "defaultState"
              }
            ]
          }
        ]
      }
    });
  
    return States;
  });
