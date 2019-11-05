import React, { Component } from 'react';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  operationColorStyle = {
    background: "rgb(255,200,105)",
    background: "linear-gradient(180deg, rgba(255,143,62,1) 22%, rgba(255,125,33,1) 60%, rgba(255,107,0,1) 100%)"
  }

  componentDidMount() {
    const btn = document.querySelectorAll("button");
    btn.forEach((btn) => {
      btn.addEventListener("click", this.handleBtnClick);
    })
  }

  em = this.props.emitter;
  emClick = (e) => { this.em.emitEvent('handleInput', [e]) };
  emCalculate = () => this.em.emitEvent('handleCalculate');
  emClear = () => this.em.emitEvent('handleClear');
  emDelete = () => this.em.emitEvent('handleDelete');

  handleBtnClick = (input) => {
    input = input.target.innerHTML;
    switch (input) {
      case '←':
        this.emDelete();
        break;
      case '=':
        this.emCalculate();
        break;
      case 'C':
        this.emClear();
        break;
      case '☰':
        break;
      default:
        this.emClick(input);
        break;
    }
  }

  render() {
    return (
      <div style={{ height: '30rem' }}>
        <div class='BtnColumn'>
          <button class="Btn" style={{ backgroundColor: 'white', color: 'red' }}>C</button>
          <button class="Btn">1</button>
          <button class="Btn">4</button>
          <button class="Btn">7</button>
          <button class="Btn" style={{ background: 'rgba(150, 117, 117, 0.377)' }}>←</button>
        </div>
        <div class='BtnColumn'>
          <button class="Btn" style={this.operationColorStyle}>%</button>
          <button class="Btn">2</button>
          <button class="Btn">5</button>
          <button class="Btn">8</button>
          <button class="Btn">0</button>
        </div>
        <div class='BtnColumn'>
          <button class="Btn" style={this.operationColorStyle}>/</button>
          <button class="Btn">3</button>
          <button class="Btn">6</button>
          <button class="Btn">9</button>
          <button class="Btn">.</button>
        </div>
        <div class='BtnColumn'>
          <button class="Btn" style={this.operationColorStyle}>*</button>
          <button class="Btn" style={this.operationColorStyle}>+</button>
          <button class="Btn" style={this.operationColorStyle}>-</button>
          <button class="Btn BigEnter">=</button>
        </div>
      </div>

    );
  }
}

export default Buttons;