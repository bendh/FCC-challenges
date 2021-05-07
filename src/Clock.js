import React from 'react';
import './Clock.css';
export class ClockApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleBreakChanges = this.handleBreakChanges.bind(this);
    this.handleSessionChanges = this.handleSessionChanges.bind(this);
    this.handleTimerControlClick = this.handleTimerControlClick.bind(this);
    this.state = {
      breakDuration: 5,
      sessionDuration: 25,
      timerLabelValue: 'Session',
      timeLeftValue: '00:00',
      testOutput: ''
    }
  }

  handleBreakChanges = (event) => {
    let targetId = event.target.id;
    this.setState(state => {
      return {
        ...state,
        testOutput: 'event triggered by '.concat(targetId)
      }
    });
  };

  handleSessionChanges = (event) => {
    let targetId = event.target.id;
    this.setState(state => {
      return {
        ...state,
        testOutput: 'event triggered by '.concat(targetId)
      }
    });
  };

  handleTimerControlClick = (event) => {
    let targetId = event.target.id;
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
        <h1>25 + 5 Clock</h1>
        <div id='timer-label' >{this.state.timerLabelValue}</div>
        <div id='time-left'>{this.state.timeLeftValue}</div>
        <label htmlFor="break-slider" id="break-label">Break length</label>
        <div id="break-decrement" onClick={this.handleBreakChanges}>-</div>
        <input type="range" min="1" max="60" value={this.state.breakDuration} id="break-length" onChange={this.handleBreakChanges} />
        <div id="break-increment" onClick={this.handleBreakChanges}>+</div>

        <label htmlFor="session-slider" id="session-label">Session length</label>
        <div id="session-decrement" onClick={this.handleSessionChanges}>-</div>
        <input type="range" min="1" max="60" value={this.state.sessionDuration} id="session-length" onChange={this.handleSessionChanges} />
        <div id="session-increment" onClick={this.handleSessionChanges}>+</div>
        <div id='start_stop' onClick={this.handleTimerControlClick}>Start / Stop</div>
        <div id='reset' onClick={this.handleTimerControlClick}>Reset</div>
        <p id="testoutput">{this.state.testOutput}</p>
      </>
    );
  }
}
