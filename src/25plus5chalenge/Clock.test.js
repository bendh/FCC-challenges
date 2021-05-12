import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { ClockApp } from './Clock';

window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ }

describe('All expected UI elements are present', () => {
  test.each`
  cssId |htmlContent |story
  ${'break-label'} | ${'Break length'}|${'User Story #1: I can see an element with id="break-label" that contains a string (e.g. "Break Length").'}
  ${'session-label'} | ${'Session length'}| ${'User Story #2: I can see an element with id="session-label" that contains a string (e.g. "Session Length").'}
`('$story', ({ cssId, htmlContent }) => {
    render(<ClockApp />);

    let foundElement = document.getElementById(cssId);

    expect(foundElement).toBeTruthy();
    expect(foundElement).toHaveTextContent(htmlContent);
  });

  test.each`
cssId1 | cssId2| story
${'break-decrement'}|${'session-decrement'}|${'User Story #3: I can see two clickable elements with corresponding IDs: id="break-decrement" and id="session-decrement".'}
${'break-increment'}|${'session-increment'}|${'User Story #4: I can see two clickable elements with corresponding IDs: id="break-increment" and id="session-increment".'}
`('$story', ({ cssId1, cssId2 }) => {
    render(<ClockApp />);
    let foundBreakElement = document.getElementById(cssId1);
    let foundSessionElement = document.getElementById(cssId2);

    expect(foundBreakElement).toBeTruthy();
    expect(foundSessionElement).toBeTruthy();

    fireEvent.click(foundBreakElement);
    fireEvent.click(foundSessionElement);
    if (cssId1.endsWith('increment')) {
      expect(document.getElementById('breakDisplay')).toHaveTextContent(6);
      expect(document.getElementById('sessionDisplay')).toHaveTextContent(26);
    } else {
      expect(document.getElementById('breakDisplay')).toHaveTextContent(4);
      expect(document.getElementById('sessionDisplay')).toHaveTextContent(24);
    }



  });

  test.each`
  cssId | defaultValue | story
  ${'break-length'}|   ${'5'}|   ${'User Story #5: I can see an element with a corresponding id="break-length", which by default (on load) displays a value of 5.'}
  ${'session-length'}|   ${'25'}|   ${'User Story #6: I can see an element with a corresponding id="session-length", which by default displays a value of 25.'}
`('$story', ({ cssId, defaultValue }) => {
    render(<ClockApp />);
    let rangeInput = document.getElementById(cssId);

    expect(rangeInput).toHaveValue(defaultValue);
  });

  test('User Story #7: I can see an element with a corresponding id="timer-label", that contains a string indicating a session is initialized (e.g. "Session").', () => {
    render(<ClockApp />);
    let element = document.getElementById('timer-label');

    expect(element).toHaveTextContent('Session');
  });

  test('User Story #8: I can see an element with corresponding id="time-left". NOTE: Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00).', () => {
    render(<ClockApp />);
    let element = document.getElementById('time-left');

    expect(element).toHaveTextContent('25:00');
  });

  test.each`
cssId | story
${'start_stop'} | ${'User Story #9: I can see a clickable element with a corresponding id="start_stop".'}
${'reset'} | ${'User Story #10: I can see a clickable element with a corresponding id="reset".'}
`('$story', ({ cssId }) => {
    render(<ClockApp />);
    let element = document.getElementById(cssId);

    fireEvent.click(element);
  });
});


describe('All functionality behaves as expected by FCC', () => {
  test('User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to its default state.', () => {
    render(<ClockApp />);

    fireEvent.click(document.getElementById('reset'));
    let sessionSlider = document.getElementById('session-length');
    let breakSlider = document.getElementById('break-length');
    let timerLabel = document.getElementById('time-left');

    expect(sessionSlider).toHaveValue('25');
    expect(breakSlider).toHaveValue('5');
    expect(timerLabel).toHaveTextContent('25:00');
  });

  test.each`
clickCssId | valueCssId | expectedValue | story
${'break-decrement'} | ${'break-length'} | ${'4'} | ${'User Story #12: When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1, and I can see the updated value.'}
${'break-increment'} | ${'break-length'} | ${'6'} |${'User Story #13: When I click the element with the id of break-increment, the value within id="break-length" increments by a value of 1, and I can see the updated value.'}
${'session-decrement'} | ${'session-length'} | ${'24'}  | ${'User Story #14: When I click the element with the id of session-decrement, the value within id="session-length" decrements by a value of 1, and I can see the updated value.'}
${'session-increment'} | ${'session-length'} | ${'26'}  | ${'User Story #15: When I click the element with the id of session-increment, the value within id="session-length" increments by a value of 1, and I can see the updated value.'}
`('$story', ({clickCssId, valueCssId, expectedValue}) => {
  render(<ClockApp />);
  let timerLabel = document.getElementById('time-left');

  fireEvent.click(document.getElementById(clickCssId));

  expect(document.getElementById(valueCssId)).toHaveValue(expectedValue);
  if (clickCssId.startsWith('session')) {
    let expectedTimerValue = expectedValue.length > 1 ? `${expectedValue}:00` : `0${expectedValue}:00`;
    expect(timerLabel).toHaveTextContent(expectedTimerValue);
  }
  });

  test('User Story #16: I should not be able to set a session or break length to <= 0 ', ()=>{
    render(<ClockApp />);
    let timerLabel = document.getElementById('time-left');
    let breakLength = document.getElementById('break-length').value;
    expect(breakLength).toBe('5');

    for(let i = 0;i <= breakLength;i++) {
      fireEvent.click(document.getElementById('break-decrement'));
    }
    expect(document.getElementById('break-length').value).toBe('1');

    let sessionLength = document.getElementById('session-length').value;
    for (let i = 0; i <= sessionLength; i++) {
      fireEvent.click(document.getElementById('session-decrement'));
    }

    expect(document.getElementById('session-length').value).toBe('1');
    expect(timerLabel).toHaveTextContent('01:00');
  });

  test('User Story #17: I should not be able to set a session length > 60 or break length to > 25', ()=> {
    render(<ClockApp />);
    let timeLeft = document.getElementById('time-left');
    let breakLength = document.getElementById('break-length').value;
    expect(breakLength).toBe('5');

    for (let i = 0; i <= 60; i++) {
      fireEvent.click(document.getElementById('break-increment'));
    }
    expect(document.getElementById('break-length').value).toBe('60');

    for (let i = 0; i <= 70; i++) {
      fireEvent.click(document.getElementById('session-increment'));
    }

    expect(document.getElementById('session-length').value).toBe('60');
    expect(timeLeft).toHaveTextContent('60:00');
  });

  test('User Story #18: When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in id="session-length", even if the value has been incremented or decremented from the original value of 25.', () => {
    render(<ClockApp />);
    let startButton = document.getElementById('start_stop');
    fireEvent.click(startButton);
    
    expect(document.getElementById('time-left')).toHaveTextContent('25:00');
  });

  test.skip('User Story #19: If the timer is running, the element with the id of time-left should display the remaining time in mm:ss format (decrementing by a value of 1 and updating the display every 1000ms).', () => {

  });

  test.skip.each`
  clickCssId | timerRunning | story
  ${'start-stop'} | ${true} | ${'User Story #20: If the timer is running and I click the element with id="start_stop", the countdown should pause.'}
  ${'start-stop'} | ${false} | ${'User Story #21: If the timer is paused and I click the element with id="start_stop", the countdown should resume running from the point at which it was paused.'}
`('$story', (clickCssId, timerRunning) => {

  });

  test.skip('User Story #22: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a break has begun.', () => {

  });

  test.skip('User Story #23: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the value currently displayed in the id="break-length" element.', () => {

  });

  test.skip('User Story #24: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a session has begun.', () => {

  });

  test.skip('User Story #25: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the value currently displayed in the id="session-length" element.', () => {

  });

  test.skip('User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audio tag and have a corresponding id="beep".', () => {

  });

  test.skip('User Story #27: The audio element with id="beep" must be 1 second or longer.', () => {

  });

  test.skip('User Story #28: The audio element with id of beep must stop playing and be rewound to the beginning when the element with the id of reset is clicked.', () => {

  });
});

