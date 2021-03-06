import React from 'react';
import './App.css';
import DisplayBlock from './component/DisplayBlock'
import Buttons from './component/Buttons'
import eventemitter from 'wolfy87-eventemitter'

let emitter = new eventemitter();
let lastChar = ''

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displaytext: '0',
      displaytext2: '0',
    };
    this.history = []
  }

  componentDidMount() {
    emitter.addListener('handleInput', this.handleInput);
    emitter.addListener('handleCalculate', this.handleCalculate);
    emitter.addListener('handleClear', this.handleClear);
    emitter.addListener('handleDelete', this.handleDelete);
  }

  handleInput = (input) => {
    const displaytext = this.state.displaytext;
    const lastTwoChar = displaytext.toString().slice(displaytext.length - 2, displaytext.length - 1);
    //input too many input
    if (displaytext.length > 12)
      // this.handleAlert('Error:Input too much')
      return

    //If input is symbol 
    if (isNaN(input)) {
      if (isNaN(lastChar))
      // this.handleAlert('Error:Double symbol');
        return 
      if (input === '.') {
        try {
          isNaN(eval(displaytext + "."))
          this.setState({ displaytext: displaytext + '.' });
        }
        catch (e) {
          // this.handleAlert('Error:Double dot');
          return 
        }
      }
      if (input === '%') {
        let sum = eval(displaytext) / 100
        sum = Number(parseFloat(sum).toFixed(10));
        this.history.push(this.state.displaytext + " % = " + sum)
        return (this.setState({ displaytext2: sum })
          , this.setState({ displaytext: '0' })
        )
      }
      //let calculator can input negative number
      if (input === '-' && displaytext === '0')
        this.setState({ displaytext: input });
      else
        this.setState({ displaytext: displaytext + input });
      lastChar = input;
      return
    }
    //input Num
    if (displaytext === '0')
      this.setState({ displaytext: input })
    //DeBug for zero after operation 
    else if (isNaN(lastTwoChar) && lastTwoChar !== '.' && lastChar === '0') {
      let dt = displaytext.substring(0, displaytext.length - 1) + input
      this.setState({ displaytext: dt })
      return lastChar = input
    } else
      this.setState({ displaytext: displaytext + input })
    lastChar = input;
  }

  handleDelete = () => {
    this.setState({ displaytext2: '0' })
    let displaytext = this.state.displaytext;
    // if display is Null show 0
    displaytext = displaytext.toString().slice(0, -1);
    displaytext.toString().length < 1 ?
      this.setState({ displaytext: '0' }) :
      this.setState({ displaytext: displaytext })

    lastChar = displaytext.charAt(displaytext.length - 1);
  }

  handleClear = () => {
    this.setState({ displaytext: '0' })
    this.setState({ displaytext2: '0' })
    lastChar = '';
  }

  handleCalculate = () => {
    //handle lastChar is a symbol
    if (isNaN(lastChar))
    // this.handleAlert('Error:Input error')
      return 
    let sum = eval(this.state.displaytext.toString());
    //handle 0/0
    if (isNaN(sum))
    // this.handleAlert('Error:Input error')
      return 
    sum = Number(parseFloat(sum).toFixed(10));
    this.setState({ displaytext2: sum.toString() })
    this.history.push(this.state.displaytext + " = " + sum)
  }

  handleAlert = (message) => {
    let warn = document.getElementById('alert1');
    warn.className = warn.className + ' active';
    warn.innerHTML = message;
    setTimeout(() => {
      warn.className = 'alert1';
    }, 2000);
  }

  handleHistroy = () => {
    let limit = 0;
    if (this.history.length - 1 >= 0) {
      let arrayHistory = document.getElementById('history');
      let historyBtn = document.getElementById('historyBtn');

      arrayHistory.className = arrayHistory.className + ' active';
      historyBtn.className = historyBtn.className + ' active';

      arrayHistory.innerHTML = "";

      if (this.history.length > 12)
        limit = this.history.length - 12;
      this.history.forEach((item, key) => {
        if (key >= limit)
          arrayHistory.innerHTML += key + 1 + ". " + item + "<br>";
      })
    }
  }

  handleCloseHistory = () => {
    let arrayHistory = document.getElementById('history');
    let historyBtn = document.getElementById('historyBtn');
    arrayHistory.className = 'history';
    historyBtn.className = 'Btn hisotryBtn';
  }

  render() {
    return (
      <div alignContent="center">
        <span id='history' className='history' />
        <button id='historyBtn' className='Btn hisotryBtn' onClick={this.handleCloseHistory}>X</button>
        <span id='alert1' className='alert1' />
        <div className='FirstContainer' >
          <DisplayBlock displaytext={this.state.displaytext} displaytext2={this.state.displaytext2} handleHistroy={this.handleHistroy} />
          <Buttons emitter={emitter} />
        </div>
      </div>
    );
  }
}

export default App;
