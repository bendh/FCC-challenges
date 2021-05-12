import React from 'react';
import './Clock.css';

const defaultState = {
  breakDuration: 5,
  sessionDuration: 25,
  timerLabelValue: 'Session',
  timeLeftValue: '25:00',
  timer: 'session',
  running: false
}

export class ClockApp extends React.Component {
  timerID;
  constructor(props) {
    super(props);
    this.handleBreakChanges = this.handleBreakChanges.bind(this);
    this.handleSessionChanges = this.handleSessionChanges.bind(this);
    this.handleTimerControlClick = this.handleTimerControlClick.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.generateDisplayValueWith = this.generateDisplayValueWith.bind(this);
    this.state = {
      ...defaultState,
      testOutput: ''
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTimer() {
      let time = this.state.timeLeftValue.split(':');
      let minutes = parseInt(time[0]);
      let seconds = parseInt(time[1]);
      if (seconds === 0 && minutes === 0) {
        let sound = document.getElementById('beep');
        sound.volume = 0.5;
        sound.play();
        this.setState(state => {
          let timer = state.timer === 'session'?'break':'session';
          return {
            ...state,
            timer,
            timeLeftValue: timer === 'session' ? this.generateDisplayValueWith(state.sessionDuration, 0): this.generateDisplayValueWith(state.breakDuration, 0),
            timerLabelValue: timer === 'session' ? 'Session' : 'Break'
          }
        });
      } else {
        if (seconds === 0) {
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }
        this.setState(state=>{
          return {
            ...state,
            timeLeftValue: this.generateDisplayValueWith(minutes, seconds)
          }
        });
      }
  }

  handleBreakChanges = (event) => {
    let targetId = event.target.id;
    let targetValue = event.target.value;
    if (!this.state.running) {
      if (targetId.endsWith('length')) {
        this.setState(state => {
          return {
            ...state,
            breakDuration: targetValue
          }
        });
      } else if (targetId.endsWith('increment') && this.state.breakDuration < 60) {
        this.setState(state => {
          let breakLength = state.breakDuration + 1;
          return {
            ...state,
            breakDuration: breakLength
          }
        });
      } else if (targetId.endsWith('decrement') && this.state.breakDuration > 1) {
        this.setState(state => {
          let breakLength = state.breakDuration - 1;
          return {
            ...state,
            breakDuration: breakLength
          }
        });
      }
    }
  }

  handleSessionChanges = (event) => {
    let targetId = event.target.id;
    let targetValue = event.target.value;
    if(!this.state.running) {
      if (targetId.endsWith('length')) {
        this.setState(state => {
          return {
            ...state,
            sessionDuration: targetValue,
            timeLeftValue: this.generateDisplayValueWith(targetValue, 0)
          }
        });
      } else if (targetId.endsWith('increment') && this.state.sessionDuration < 60) {
        this.setState(state => {
          let sessionLength = state.sessionDuration + 1;
          return {
            ...state,
            sessionDuration: sessionLength,
            timeLeftValue: this.generateDisplayValueWith(sessionLength, 0)
          }
        });
      } else if (targetId.endsWith('decrement') && this.state.sessionDuration > 1) {
        this.setState(state => {
          let sessionLength = state.sessionDuration - 1;
          return {
            ...state,
            sessionDuration: sessionLength,
            timeLeftValue: this.generateDisplayValueWith(sessionLength, 0)
          }
        });
      }
    }
    }

  generateDisplayValueWith(minutes, seconds) {
    let displayValue = '';
    if(minutes < 10) {
      displayValue = displayValue.concat('0', minutes);
    } else if (minutes > 9) {
      displayValue = displayValue.concat(minutes);
    }
    if (seconds < 10) {
      displayValue = displayValue.concat(':0', seconds);
    } else if (seconds > 9) {
      displayValue = displayValue.concat(':', seconds);
    }
    return displayValue;
  }

  handleTimerControlClick = (event) => {
    let targetId = event.target.id;
    if (targetId === 'reset') {
      this.setState(defaultState);
      clearInterval(this.timerID);
      let sound = document.getElementById('beep');
      sound.pause();
      sound.currentTime = 0;
    } else {
      if (this.state.running) {
        clearInterval(this.timerID);
      } else {
        this.timerID = setInterval(
          () => {
            if (this.state.running) {
              this.updateTimer();
            }
          },
          1000
        );
      }
      this.setState(state => {
        return {
          ...state,
          running: state.running ? false : true
        }
      });
    }
  };

  render() {
    return (
      <div>
        <h1>25 + 5 Clock</h1>
          <h2 id='timer-label' >{this.state.timerLabelValue}</h2>
          <h2 id='time-left' >{this.state.timeLeftValue}</h2>

          <div className="bigger-font"><i id="break-decrement" onClick={this.handleBreakChanges} className="fas fa-minus-circle right-align"></i></div>
          <span id="breakDisplay" >
            <label htmlFor="break-length" id="break-label"><i className="fas fa-coffee" /> Break length </label>{this.state.breakDuration}
            <input type="range" min="1" max="60" value={this.state.breakDuration} id="break-length" onChange={this.handleBreakChanges} />
          </span>
          <div className="bigger-font"><i id="break-increment" onClick={this.handleBreakChanges} className="fas fa-plus-circle right-align" /></div>


          <div className="bigger-font"><i id="session-decrement" className="fas fa-minus-circle right-align" onClick={this.handleSessionChanges} /></div>
          <span id="sessionDisplay">
            <label htmlFor="session-length" id="session-label"><i className="fas fa-briefcase" /> Session length </label>{this.state.sessionDuration}
            <input type="range" min="1" max="60" value={this.state.sessionDuration} id="session-length" onChange={this.handleSessionChanges} />
          </span>
          <div className="bigger-font"><i id="session-increment" className="fas fa-plus-circle right-align" onClick={this.handleSessionChanges} /></div>
          <span>
          <button id='start_stop' onClick={this.handleTimerControlClick}>{this.state.running?'Stop':'Start'}</button>
          <button id='reset' onClick={this.handleTimerControlClick}>Reset</button>
        </span>
        <audio id="beep" src="https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" />
      </div>
    );
  }
}