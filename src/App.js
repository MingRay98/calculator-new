import React from 'react';
import './App.css';
import DisplayBlock from './component/DisplayBlock'
import Buttons from './component/Buttons'
import eventemitter from 'wolfy87-eventemitter'

let emitter = new eventemitter();
let lastOperation = ''
let lastChar = ''

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displaytext: '0',
      displaytext2: '0',
    };
  }

  componentDidMount() {
    emitter.addListener('handleNumClick', this.handleNumClick);
    emitter.addListener('handleCalculate', this.handleCalculate);
    emitter.addListener('handleClear', this.handleClear);
    emitter.addListener('handleDelete', this.handleDelete);
  }

  handleNumClick = (input) => {
    const displaytext = this.state.displaytext;
    const lastTwoChar = displaytext.toString().slice(displaytext.length - 2, displaytext.length - 1);
    //input too many input
    if (displaytext.length > 12)
      return alert("too much")
    //DeBug for zero after operation 
    if (isNaN(lastTwoChar) && lastTwoChar !== '.' && lastChar === '0' && !isNaN(input)) {
      let dt = displaytext.substring(0, displaytext.length - 1) + input
      this.setState({ displaytext: dt })
      return lastChar = input
    }
    //If input is symbol 
    if (isNaN(input)) {
      if (isNaN(lastChar))
        return alert('double symbol');
      if (input === '.') {
        try {
          isNaN(eval(displaytext + "."))
        }
        catch (e) {
          return alert('double dot');
        }
      }
      if (input === '%') {
        let sum = eval(displaytext) / 100
        sum = Number(parseFloat(sum).toFixed(10));
        return this.setState({ displaytext: sum })
      }
      else if (lastOperation === '' || input === '.')
        this.setState({ displaytext: displaytext + input });
      else {
        if (lastOperation === '+')
          this.addNum(input);
        if (lastOperation === '-')
          this.minusNum(input);
        if (lastOperation === '*')
          this.multiplyNum(input);
        if (lastOperation === '/')
          this.divisorNum(input);
      }
      if (input !== ".") lastOperation = input;
    }
    //input Num
    if (!isNaN(input) && displaytext === '0')
      this.setState({ displaytext: input })
    else if (!isNaN(input))
      this.setState({ displaytext: displaytext + input })

    lastChar = input;
  }

  handleDelete = () => {
    let displaytext = this.state.displaytext;
    const delteChar = displaytext.charAt(displaytext.length - 1)

    displaytext = displaytext.toString().slice(0, -1);
    displaytext.toString().length < 1 ?
      this.setState({ displaytext: '0' }) :
      this.setState({ displaytext: displaytext })

  }

  handleClear = () => {
    lastOperation = '';
    lastChar = '';
    this.setState({ displaytext: '0' })
  }

  handleCalculate = () => {
    let sum = eval(this.state.displaytext.toString());
    sum = Number(parseFloat(sum).toFixed(10));
    this.setState({ displaytext: sum.toString() })
    lastOperation = '';
    lastChar = '';
  }

  render() {
    return (
      <div alignContent="center">
        <div className='FirstContainer' >
          <DisplayBlock Component={this.state.displaytext} />
          <Buttons emitter={emitter} />
        </div>
      </div>
    );
  }
}

export default App;
