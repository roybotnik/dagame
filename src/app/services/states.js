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
          if (this.textMatchesKey(text,possibleState.key)) {
            return this.setCurrentState(possibleState);
          }
        }
      },
      textMatchesKey : function (text,key) {
        return text.toLowerCase().indexOf(key.toLowerCase()) !== -1;
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
              },
              {
                key : "time",
                phrase : "time to eat dick",
                after : "defaultState"
              },
              {
                key : "ian"
              }
            ]
          }
        ]
      }
    });
  
    return States;
  });
