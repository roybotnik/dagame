"use strict";

angular.module("dagame").
  factory("States",function () {
    var States = function (handlePhrase) {
      this.handlePhrase = handlePhrase;
      this.currentState = this.defaultState;
      this.statesByName = this.indexStates();
    };

    angular.extend(States.prototype,{
      processText : function (text) {
        var possibleState;
        for (var index = 0; index < this.currentState.states.length; index++) {
          possibleState = this.currentState.states[index];
          if (possibleState.key !== undefined && this.textMatchesKey(text,possibleState.key)) {
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
        this.setupStateReset();
      },
      setupStateReset : function () {
        clearTimeout(this.stateResetTimeout);
        this.stateResetTimeout = setTimeout(function () {
          this.setCurrentState(this.defaultState);
        }.bind(this),10 * 1000);
      },
      getState : function (stateName) {
        if (stateName === "defaultState") {
          return this.defaultState;
        } else {
          if (this.statesByName[stateName]) {
            return this.statesByName[stateName];
          } else {
            debugger;
          }
        }
      },
      indexStates : function () {
        var statesByName = {};
        this.walkStates(function (state) {
          if (state.name !== undefined) {
            statesByName[state.name] = state;
          }
        });
        return statesByName;
      },
      walkStates : function (callback) {
        var state = this.defaultState;
        var walk = function (state) {
          callback(state);
          if (state.states) {
            state.states.forEach(walk);
          }
        };
        walk(state);
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
                key : "f***",
                phrase : "no fucks given",
                after : "defaultState"
              }
            ]
          },
          {
            key : "alexa",
            phrase : "i'm not alexa",
            after : "defaultState"
          },
          {
            key : "f***",
            states : [
              {
                key : "you",
                phrase : "fuck you too",
                after : "angry"
              }
            ]
          },
          {
            name : "angry",
            states : [
              {
                key : "sorry",
                phrase : "NO FUCK YOU",
                after : "defaultState"
              }
            ]
          }
        ]
      }
    });
  
    return States;
  });
