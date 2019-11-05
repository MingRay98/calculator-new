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

  render() {
    let em = this.props.emitter;
    const emClick = (e) => { em.emitEvent('handleNumClick', [e.target.value]) };
    const emCalculate = () => em.emitEvent('handleCalculate');
    const emClear = () => em.emitEvent('handleClear');
    const emDelete = () => em.emitEvent('handleDelete');

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

      // <div >
      //   <div className='OperationTopBtn' >
      //     <button className='Btn' onClick={emClear} style={{ borderRadius: '5rem', backgroundColor: 'white', color: 'red' }}>C</button>
      //     <button className='Btn' onClick={emClick} value='%' style={this.operationColorStyle}>%</button>
      //     <button className='Btn' onClick={emClick} value='/' style={this.operationColorStyle}>/</button>
      //     <button className='Btn' onClick={emClick} value='*' style={this.operationColorStyle}>X</button>
      //   </div>
      //   <div className='SecondContainer' >
      //     <div className='NumBtnDiv'>
      //       <div className='NumBtnInColumn'>
      //         <button className='Btn' onClick={emClick} value='1'>1</button>
      //         <button className='Btn' onClick={emClick} value='2'>2</button>
      //         <button className='Btn' onClick={emClick} value='3'>3</button>
      //       </div>

      //       <div className='NumBtnInColumn'>
      //         <button className='Btn' onClick={emClick} value='4'>4</button>
      //         <button className='Btn' onClick={emClick} value='5'>5</button>
      //         <button className='Btn' onClick={emClick} value='6'>6</button>
      //       </div>

      //       <div className='NumBtnInColumn'>
      //         <button className='Btn' onClick={emClick} value='7'>7</button>
      //         <button className='Btn' onClick={emClick} value='8'>8</button>
      //         <button className='Btn' onClick={emClick} value='9'>9</button>
      //       </div>

      //       <div className='NumBtnInColumn' >
      //         <button onClick={emDelete} className='Btn' style={{ backgroundColor: 'rgb(52, 56, 106)' ,borderRadius:'5rem'}} >←</button>
      //         <button onClick={emClick} className='Btn' value='0'>0</button>
      //         <button onClick={emClick} className='Btn' value='.'>．</button>
      //       </div>

      //     </div>
      //     <div className='OperationRigthBtn'>
      //       <div className='OperationRigthBtnPM'>
      //         <button className='Btn' onClick={emClick} value='+' style={this.operationColorStyle} >+</button>
      //         <button className='Btn' onClick={emClick} value='-' style={this.operationColorStyle} >-</button>
      //       </div>
      //       <button className='BigEnter' onClick={emCalculate} >=</button>
      //     </div>
      //   </div>
      //   </div>

    );
  }
}

export default Buttons;