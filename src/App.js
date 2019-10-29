import React from 'react';
import './App.css';
import DisplayBlock from './component/DisplayBlock'
import Buttons from './component/Buttons'
import eventemitter from 'wolfy87-eventemitter'

let emitter = new eventemitter();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastOperation: '',
      displaytext: '0',
      lastChar: ''
    };
  }

  componentDidMount() {
    emitter.addListener('add', this.addNum);
    emitter.addListener('minus', this.minusNum);
    emitter.addListener('multiply', this.multiplyNum);
    emitter.addListener('divisor', this.divisorNum);
  }

  addNum = (temp) => {
    const num = this.state.displaytext.split('+');
    const sum = parseFloat(num[0]) + parseFloat(num[1]);
    this.setState({ displaytext: sum + temp })
  }

  minusNum = (temp) => {
    const num = this.state.displaytext.split('-');
    const sum = parseFloat(num[0]) - parseFloat(num[1]);
    this.setState({ displaytext: sum + temp })
  }



  multiplyNum = (temp) => {
    const num = this.state.displaytext.split('*');
    const sum = parseFloat(num[0]) * parseFloat(num[1]);
    this.setState({ displaytext: sum + temp })
  }

  divisorNum = (temp) => {
    const num = this.state.displaytext.split('/');
    let sum = parseFloat(num[0]) / parseFloat(num[1]);
    sum = Number(parseFloat(temp).toFixed(10));
    this.setState({ displaytext: sum + temp })
  }



  handleNumClick = (e) => {

    const lastOperation = this.state.lastOperation;
    const lastChar = this.state.lastChar;
    const displaytext = this.state.displaytext;
    const temp = e.target.value;
    const lastTwoChar = displaytext.slice(displaytext.length - 2);

    if (displaytext.length > 12) { //輸入過多
      return alert("too much")
    }

    if (lastOperation !== '' && lastChar === '0') {
      if (lastTwoChar === '.0' || lastTwoChar === '00') {
        console.log('沒事')
      } else if (!isNaN(temp)) {
        let dt = displaytext.substring(0, displaytext.length - 1) + temp
        this.setState({ displaytext: dt })
        return this.state.lastChar = temp
      }
    }

    if (isNaN(temp)) {
      if (isNaN(lastChar)) //雙重符號
        return alert('double symbol');
      if (temp === '.') {  //雙重小數
        try {
          isNaN(eval(this.state.displaytext + "."))
        }
        catch (e) {
          return alert('double dot');
        }
      }

      if (temp === '%') {
        this.setState({ displaytext: this.state.displaytext / 100 })
        return
      } else if (lastOperation === '' || temp === '.')
        this.setState({ displaytext: this.state.displaytext + temp });
      else {
        if (lastOperation === '+')
          emitter.emitEvent('add', [temp]);
        if (lastOperation === '-')
          emitter.emitEvent('minus', [temp]);
        if (lastOperation === '*')
          emitter.emitEvent('multiply', [temp]);
        if (lastOperation === '/')
          emitter.emitEvent('divisor', [temp]);
      }
      if (temp !== ".") this.state.lastOperation = temp;
    }

    if (!isNaN(temp) && this.state.displaytext === '0')
      this.setState({ displaytext: temp })
    else if (!isNaN(temp))
      this.setState({ displaytext: this.state.displaytext + temp })

    this.state.lastChar = temp;

  }

  handleDelete = () => {
    const displaytext = this.state.displaytext;
    const lastChar = displaytext.charAt(displaytext.length - 2)
    const delteChar = displaytext.charAt(displaytext.length - 1)
    if (delteChar === '+' || delteChar === '-' || delteChar === '/' || delteChar === '*')
      this.setState({ lastOperation: "" })

    let temp = this.state.displaytext.toString().slice(0, -1);

    this.state.displaytext.toString().length === 1 ?
      this.setState({ displaytext: '0' }) :
      this.setState({ displaytext: temp })
    this.state.lastChar = lastChar
  }

  handleClear = () => {
    this.state.lastOperation = '';
    this.state.lastChar = '';
    this.setState({ displaytext: '0' })
  }

  handleCalculate = () => {
    let temp = eval(this.state.displaytext.toString());
    if (temp.toString().indexOf('.') == true) {
      temp = Number(parseFloat(temp).toFixed(10));
    }
    this.setState({ displaytext: temp.toString() })
    this.state.lastOperation = '';
    this.state.lastChar = '';
  }

  render() {
    return (
      <div alignContent="center">
        <div className='FirstContainer' >
          <DisplayBlock Component={this.state.displaytext} />
          <Buttons handleCalculate={this.handleCalculate} handleClear={this.handleClear} handleDelete={this.handleDelete} handleNumClick={this.handleNumClick} />
        </div>
      </div>
    );
  }
}

export default App;
