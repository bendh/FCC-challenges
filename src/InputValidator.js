export class InputValidator {
  static validateInput(formula, value) {
    // let isNumber = (char) => Number.isInteger(parseInt(char));
    // let isOperant = (char) => /[x/+-]/.test(char);
    // let isMinusSign = (char) => char.includes('-');
    // let lastChar = formula.charAt(formula.length - 1);
    // if (isNumber(value)) {
    //   if (formula.length === 1 && formula === '0') {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // } else if (isMinusSign(value)) {
    //   return !(lastChar === '-' && formula.charAt(formula.length - 2));
    // } else if (isOperant(value)) {
    //   return !isOperant(lastChar);
    // } else if (value.includes('.')) {
    //   return /\d/g.test(formula);//(^-?\d+\.?\d+)([-+x\\]{1})(-?\d+\.?\d+)?((-?\d+\.?\d+$)|([-+x\\]{1}$))
    // }(?<opr>[-+x\\]?)(?<op2>-?\d+\.?\d+)((-?\d+\.?\d+$)|(?<opr2>[-+x\\]{1}$))
    const regexExpression = /(?<operand1>^-?\d*(?:\.?)?)(?<operator1>[+\-\\x]?)(?<operand2>-?\d*(?:\.?)?)(?<operator2>[+\-\\x]?)(?<operand3>-?\d*(?:\.?)?)/g

    let formulaAndInput = formula.concat(value);
    let matchedResultGroups = formulaAndInput.matchAll(regexExpression);
    let operation;
    for (let result of matchedResultGroups) {
      operation = { ...result.groups };
    }
    let matchedResultLength = Object.values(operation).join('').length;
    let isValid = formulaAndInput.length === matchedResultLength && !/\d+\.+\d+\.+/.test(formulaAndInput);
    return {
      ...operation,
      isValid
    }
  }
}