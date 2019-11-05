import React from 'react';
import './App.css';
import DisplayBlock from './component/DisplayBlock'
import Buttons from './component/Buttons'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displaytext: '0',
      displaytext2: '0',
    };
  }

  componentDidMount() {
    const btn = document.querySelectorAll("button");
    btn.forEach((btn) => {
      btn.addEventListener("click", this.handleBtnClick);
    })
  }

  handleBtnClick = (input) => {
    input = input.target.innerHTML;
    switch (input) {
      case '←':
        this.handleDelete();
        break;
      case '=':
        this.handleCalculate();
        break;
      case 'C':
        this.handleClear();
        break;
      case '%':
        let sum = (eval(this.state.displaytext)) / 100;
        this.setState({ displaytext2: sum })
        break;
      case '☰':
        alert('Hello world!')
        break;
      default:
        this.handleSymbolInput(input);
        break;
    }
  }

  handleSymbolInput = (input) => {
    const displaytext = this.state.displaytext;
    if (displaytext === '0')
      this.setState({ displaytext: input })
    else
      this.setState({ displaytext: displaytext + input })
  }

  handleDelete = () => {
    this.setState({ displaytext2: '0' })
    let displaytext = this.state.displaytext;
    displaytext = displaytext.toString().slice(0, -1);
    displaytext.toString().length < 1 ?
      this.setState({ displaytext: '0' }) :
      this.setState({ displaytext: displaytext })

  }

  handleClear = () => {
    this.setState({ displaytext: '0' })
    this.setState({ displaytext2: '0' })
  }

  handleCalculate = () => {
    let sum = eval(this.state.displaytext.toString());
    sum = Number(parseFloat(sum).toFixed(10));
    this.setState({ displaytext2: sum.toString() })
  }

  render() {
    return (
      <div alignContent="center">
        <div className='FirstContainer' >
          <DisplayBlock displaytext={this.state.displaytext} displaytext2={this.state.displaytext2} />
          <Buttons />
        </div>
      </div>
    );
  }
}

export default App;
