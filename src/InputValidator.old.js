// import {InputValidator as Validator} from './InputValidator';

// const validate = (formula, value)=> Validator.validateInput(formula, value);
// const resultGenerator = (isValid, capturedGroups) => {return {isValid, capturedGroups}};

// test('the first operand should accept digits only', () => {
//   let expectedResult = {
//     operand1: '9',
//     isValid: true
//   };
//   let actualResult = validate('', '9');
//   expect(actualResult).toMatchObject(expectedResult);
// });

// test('the first operand should accept digits when minus sign present', () => {
//   let expectedResult = {
//     operand1: '-9',
//     isValid: true
//   };
//   let actualResult = validate('-', '9');
//   expect(actualResult).toMatchObject(expectedResult);
// });

// test('the first operand should accept digits when minus sign and number present', () => {
//   let expectedResult = {
//     operand1: '-2639',
//     isValid: true
//   };
//   let actualResult = validate('-263', '9');
//   expect(actualResult).toMatchObject(expectedResult);
// });

// test('the first operand should accept a dot when a number is present', () => {
//   let expectedResult = {
//     operand1: '21932.',
//     isValid: true
//   };
//   let actualResult = validate('21932', '.');
//   expect(actualResult).toMatchObject(expectedResult);
// });

// test('the first operand should reject a dot when a dot is already present', () => {
//   let expectedResult = {
//     operand1: '-12343.34',
//     isValid: false
//   };
//   let actualResult = validate('-12343.34', '.');
//   expect(actualResult).toMatchObject(expectedResult);
// });
