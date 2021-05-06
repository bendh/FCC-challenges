import React from 'react';
const Button = (props) => {
  let definition = props.definition;
  return (
    <div className="button" id={definition.id} onClick={(e) => props.onClick(definition.value)}>{definition.value}</div>
  );
}

class Calculator extends React.Component {

  buttonDefinitions = [
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


  onNumericClick = (value)=> {
    let appendChar = function(char){
      this.setState(state => {
        let newIntermediateValue = state.intermediateNumber.concat(char);
        return {
          ...state,
          intermediateNumber: newIntermediateValue,
          displayValue: newIntermediateValue
        }
      });
    }.bind(this);
    if (this.state.intermediateNumber === '0' && value === '0') {
      return;
    } else if (this.state.intermediateNumber.length > 12) {
      return;
    } else if (this.state.operator.length && this.state.intermediateNumber.length ) {
      this.setState(state => {
        return {
          operator: '',
          formula: state.formula.concat(state.intermediateNumber ,state.operator, state.negate),
          intermediateNumber: value
        };
      });
    } else if (value.match(/[0-9]+/)) {
      appendChar(value);
    } else if (this.state.intermediateNumber.match(/^-?[0-9]+$/)){
      appendChar(value);
    }
  }

  onOperatorClick = (value) => {
    if (value === 'AC') {
      this.setState(state => {
        return {
          formula:'',
          intermediateNumber: '',
          displayValue: '0',
          operator: '',
          negate: ''
        };
      });
    }else if (this.state.intermediateNumber.endsWith('.')) {
      return;
    } else if(value === '-'&&this.state.intermediateNumber.length === 0) {
      this.setState(state=>{
        return {
          ...state,
          intermediateNumber: state.intermediateNumber.concat(value),
          displayValue: value
        };
      });
    } else if (value.match(/[-x/+]+/)) {
      if (this.state.operator.match(/[x/+]+/) && value === '-') {
        this.setState(state => {
          return {
            ...state,
            negate: value
          };
        });
      } else {
        this.setState(state => {
          return {
            ...state,
            operator: value,
            negate: ''
          };
        });
      }

    }
  }

  onEqualClick = () => {
    if (this.state.intermediateNumber.length > 0) {
      let formula = this.state.formula.replace('x', '*').concat(this.state.intermediateNumber);
      let result = eval(formula).toString();
      this.setState(state => {
        return {
          formula: '',
          intermediateNumber: result,
          displayValue: result,
          operator: '',
          negate: ''
        };
      });
    }

  }

  constructor(props) {
    super(props);
    this.onNumericClick = this.onNumericClick.bind(this);
    this.onOperatorClick = this.onOperatorClick.bind(this);
    this.onEqualClick = this.onEqualClick.bind(this);
    this.state = {
      formula: '',
      intermediateNumber: '',
      displayValue: 0,
      operator: ''
    }
  }

  render() {
    let buttons = this.buttonDefinitions.map((def, idx) => {
      let callBack;
      if(def.value === '=') {
        callBack = this.onEqualClick;
      } else if(def.value.match(/[0-9]+|\.+/)) {
        callBack = this.onNumericClick;
      } else {
        callBack = this.onOperatorClick;
      }
      return (
        <Button key={idx} definition={def} onClick={callBack} />
      );
    });
    return (
      <div className="calculator-body ">
        <div id="display">{this.state.displayValue}</div>
        {buttons}
      </div>
    );
  }
}

export {Calculator, Button};

// let appRoot = document.getElementById('react-calculator');
// ReactDOM.render(<Calculator />, appRoot);