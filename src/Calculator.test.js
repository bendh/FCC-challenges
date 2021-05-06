import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from  './Calculator';

const buttonDefinitions = [
  { id: 'clear', value: 'AC' },
  { id: 'divide', value: '/' },
  { id: 'multiply', value: 'x' },
  { id: 'seven', value: '7' },
  { id: 'eight', value: '8' },
  { id: 'nine', value: '9' },
  { id: 'subtract', value: '-' },
  { id: 'four', value: '4' },
  { id: 'five', value: '5' },
  { id: 'six', value: '6' },
  { id: 'add', value: '+' },
  { id: 'one', value: '1' },
  { id: 'two', value: '2' },
  { id: 'three', value: '3' },
  { id: 'equals', value: '=' },
  { id: 'zero', value: '0' },
  { id: 'decimal', value: '.' }
];

// test('renders display with corresponding id', () => {
//   render(<Calculator />);
//   const display = document.getElementById('display');
//   expect(display).toBeInTheDocument();
// });

// test('renders buttons with corresponding id', () => {
//   render(<Calculator />);
//   buttonDefinitions.forEach(def => {
//     let button = document.getElementById(def.id);
//     expect(button).toBeInTheDocument();
//   });
// });

// test('renders clicked decimal number in display', () => {
//   render(<Calculator />);
//   const display = document.getElementById('display');
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('decimal'));
//   fireEvent.click(document.getElementById('two'));

//   expect(display).toBeInTheDocument();
//   expect(display).toHaveTextContent(/^1.2$/)
// });

test('renders result of 1+2 in display', ()=>{
  render(<Calculator />);
  const display = document.getElementById('display');
  fireEvent.click(document.getElementById('one'));
  fireEvent.click(document.getElementById('add'));
  fireEvent.click(document.getElementById('two'));
  fireEvent.click(document.getElementById('equals'));

  expect(display).toBeInTheDocument();
  expect(display).toHaveTextContent(/^3$/);
});

test(' "5 * - 5" = should render -25', ()=> {
  render(<Calculator />);
  const display = document.getElementById('display');
  fireEvent.click(document.getElementById('five'));
  fireEvent.click(document.getElementById('multiply'));
  fireEvent.click(document.getElementById('subtract'));
  fireEvent.click(document.getElementById('five'));
  fireEvent.click(document.getElementById('equals'));

  expect(display).toBeInTheDocument();
  expect(display).toHaveTextContent(/^-25$/);
});

// test('renders result of 10 x 2 in display', () => {
//   render(<Calculator />);
//   const display = document.getElementById('display');
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('zero'));
//   fireEvent.click(document.getElementById('multiply'));
//   fireEvent.click(document.getElementById('two'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toBeInTheDocument();
//   expect(display).toHaveTextContent(/^20$/)
// });

// test('renders result of 10 / 3 in display', () => {
//   render(<Calculator />);
//   const display = document.getElementById('display');
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('zero'));
//   fireEvent.click(document.getElementById('divide'));
//   fireEvent.click(document.getElementById('three'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toBeInTheDocument();
//   expect(display).toHaveTextContent(/^3.3333333333333335$/)
// });

// test('renders result of 1-1 in display', () => {
//   render(<Calculator />);
//   const display = document.getElementById('display');
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('subtract'));
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toBeInTheDocument();
//   expect(display).toHaveTextContent(/^0$/)
// });

// test('renders result of -10-1 in display', () => {
//   render(<Calculator />);
//   const display = document.getElementById('display');
//   fireEvent.click(document.getElementById('subtract'));
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('zero'));
//   fireEvent.click(document.getElementById('subtract'));
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toBeInTheDocument();
//   expect(display).toHaveTextContent(/^-11$/)
// });

// test('renders result of 10--1 in display', () => {
//   render(<Calculator />);
//   const display = document.getElementById('display');
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('zero'));
//   fireEvent.click(document.getElementById('subtract'));
//   fireEvent.click(document.getElementById('subtract'));
//   fireEvent.click(document.getElementById('one'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toBeInTheDocument();
//   expect(display).toHaveTextContent(/^11$/)
// });

// test('An input of 0 0 0 should display 0', ()=>{
//   render(<Calculator />);

//   fireEvent.click(document.getElementById('zero'));
//   fireEvent.click(document.getElementById('zero'));
//   fireEvent.click(document.getElementById('zero'));

//   expect(display).toHaveTextContent(/^0$/)
// });

// test('The expression 3 + 5 - 6 should produce 2', () => {
//   render(<Calculator />);

//   fireEvent.click(document.getElementById('three'));
//   fireEvent.click(document.getElementById('add'));
//   fireEvent.click(document.getElementById('five'));
//   fireEvent.click(document.getElementById('subtract'));
//   fireEvent.click(document.getElementById('six'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toHaveTextContent(/^2$/)
// });

// test('The expression 3 + 5 * 6 should produce 33', () => {
//   render(<Calculator />);

//   fireEvent.click(document.getElementById('three'));
//   fireEvent.click(document.getElementById('add'));
//   fireEvent.click(document.getElementById('five'));
//   fireEvent.click(document.getElementById('multiply'));
//   fireEvent.click(document.getElementById('six'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toHaveTextContent(/^33$/)
// });

// test('The expression 3 + 5 * 6 - 2 / 4 should produce 32.5', ()=>{
//   render(<Calculator />);

//   fireEvent.click(document.getElementById('three'));
//   fireEvent.click(document.getElementById('add'));
//   fireEvent.click(document.getElementById('five'));
//   fireEvent.click(document.getElementById('multiply'));
//   fireEvent.click(document.getElementById('six'));
//   fireEvent.click(document.getElementById('subtract'));
//   fireEvent.click(document.getElementById('two'));
//   fireEvent.click(document.getElementById('divide'));
//   fireEvent.click(document.getElementById('four'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toHaveTextContent(/^32.5$/)
// });

// test('The sequence "5 * - + 5" = should produce an output of "10"', ()=>{
//   render(<Calculator />);
//   const display = document.getElementById('five');
//   fireEvent.click(document.getElementById('multiply'));
//   fireEvent.click(document.getElementById('subtract'));
//   fireEvent.click(document.getElementById('add'));
//   fireEvent.click(document.getElementById('equals'));

//   expect(display).toBeInTheDocument();
//   expect(display).toHaveTextContent(/^10$/)
// });
