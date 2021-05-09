import React from 'react';
import './Clock.css';

const defaultState = {
  breakDuration: 5,
  sessionDuration: 25,
  timerLabelValue: 'Session',
  timeLeftValue: '25:00',
  timer: 'session'
}

export class ClockApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleBreakChanges = this.handleBreakChanges.bind(this);
    this.handleSessionChanges = this.handleSessionChanges.bind(this);
    this.handleTimerControlClick = this.handleTimerControlClick.bind(this);
    this.state = {
      ...defaultState,
      testOutput: ''
    }

  }

  handleBreakChanges = (event) => {
    let targetId = event.target.id;
    let targetValue = event.target.value;
    if (targetId.endsWith('length')) {
      this.setState(state => {
        return {
          ...state,
          breakDuration: targetValue
        }
      });
    } else if (targetId.endsWith('increment') && this.state.breakDuration < 25) {
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

  handleSessionChanges = (event) => {
    let targetId = event.target.id;
    let targetValue = event.target.value;
    if (targetId.endsWith('length')) {
      this.setState(state => {
        return {
          ...state,
          sessionDuration: targetValue,
          timeLeftValue: ''.concat(targetValue).concat(':00')
        }
      });
    } else if (targetId.endsWith('increment') && this.state.sessionDuration <60) {
      this.setState(state => {
        let sessionLength = state.sessionDuration + 1;
        return {
          ...state,
          sessionDuration: sessionLength,
          timeLeftValue: ''.concat(sessionLength).concat(':00')
        }
      });
    } else if (targetId.endsWith('decrement') && this.state.sessionDuration > 1) {
      this.setState(state => {
        let sessionLength = state.sessionDuration - 1;
        return {
          ...state,
          sessionDuration: sessionLength,
          timeLeftValue: ''.concat(sessionLength).concat(':00')
        }
      });
    }

    }


  handleTimerControlClick = (event) => {
    let targetId = event.target.id;
    if (targetId === 'reset') {
      this.setState(defaultState);
    }
    this.setState(state => {
      return {
        ...state,
        testOutput: 'event triggered by '.concat(targetId)
      }
    });
  };

  render() {
    return (
      <>
      <header>
        <h1>25 + 5 Clock</h1>
      </header>
      <main>
          <h2 id='timer-label' >{this.state.timerLabelValue}</h2>
          <h2 id='time-left' >{this.state.timeLeftValue}</h2>
          <label htmlFor="break-slider" id="break-label"><i className="fas fa-coffee"/> Break length</label>
          <div className="bigger-font"><i id="break-decrement" onClick={this.handleBreakChanges} className="fas fa-minus-circle"></i></div>
          <div id="breakDisplay" >
            <input type="range" min="1" max="25" value={this.state.breakDuration} id="break-length" onChange={this.handleBreakChanges} />{this.state.breakDuration}
          </div>
          <div className="bigger-font"><i id="break-increment" onClick={this.handleBreakChanges} className="fas fa-plus-circle" /></div>

          <label htmlFor="session-slider" id="session-label"><i className="fas fa-briefcase" /> Session length</label>
          <div className="bigger-font"><i id="session-decrement" className="fas fa-minus-circle" onClick={this.handleSessionChanges} /></div>
          <div id="sessionDisplay">
            <input type="range" min="1" max="60" value={this.state.sessionDuration} id="session-length" onChange={this.handleSessionChanges} />{this.state.sessionDuration}
          </div>
          <div className="bigger-font"><i id="session-increment" className="fas fa-plus-circle" onClick={this.handleSessionChanges} /></div>
      </main>
      <footer>
          <button id='start_stop' onClick={this.handleTimerControlClick}>Start / Stop</button>
          <button id='reset' onClick={this.handleTimerControlClick}>Reset</button>
      </footer>
        <p id="testoutput">{this.state.testOutput}</p>
      </>
    );
  }
}
