import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { ClockApp } from './Clock';

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
    let testOutput = document.getElementById('testoutput');
    let foundBreakElement = document.getElementById(cssId1);
    let foundSessionElement = document.getElementById(cssId2);

    expect(foundBreakElement).toBeTruthy();
    expect(foundSessionElement).toBeTruthy();

    fireEvent.click(foundBreakElement);
    expect(testOutput).toHaveTextContent('event triggered by '.concat(cssId1));

    fireEvent.click(foundSessionElement);
    expect(testOutput).toHaveTextContent('event triggered by '.concat(cssId2));
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

    expect(element).toHaveTextContent('00:00');
  });

  test.each`
cssId | story
${'start_stop'} | ${'User Story #9: I can see a clickable element with a corresponding id="start_stop".'}
${'reset'} | ${'User Story #10: I can see a clickable element with a corresponding id="reset".'}
`('$story', ({ cssId }) => {
    render(<ClockApp />);
    let testOutput = document.getElementById('testoutput');
    let element = document.getElementById(cssId);

    fireEvent.click(element);

    expect(testOutput).toHaveTextContent('event triggered by '.concat(cssId));
  });
});


describe('All functionality behaves as expected by FCC', () => {
  test.skip('User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to its default state.', () => {

  });

  test.skip.each`
clickCssId | valueCssId | story
${'break-decrement'} | ${'break-lenght'} | ${'User Story #12: When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1, and I can see the updated value.'}
${'break-increment'} | ${'break-lenght'} | ${'User Story #13: When I click the element with the id of break-increment, the value within id="break-length" increments by a value of 1, and I can see the updated value.'}
${'session-decrement'} | ${'session-lenght'} | ${'User Story #14: When I click the element with the id of session-decrement, the value within id="session-length" decrements by a value of 1, and I can see the updated value.'}
${'session-increment'} | ${'session-lenght'} | ${'User Story #15: When I click the element with the id of session-increment, the value within id="session-length" increments by a value of 1, and I can see the updated value.'}
`('$story', (clickCssId, valueCssId) => {

  });

  test.skip.each`
value | story
${0} | ${'User Story #16: I should not be able to set a session or break length to <= '}
${60} | ${'User Story #17: I should not be able to set a session or break length to > '}
`('$story $value', (value) => {

  });

  test.skip('User Story #18: When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in id="session-length", even if the value has been incremented or decremented from the original value of 25.', () => {

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

