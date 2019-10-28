import React, { Component } from 'react';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  
  btnStyle = {
    borderRadius: '5rem',
    backgroundColor: 'rgb(255, 123, 0)'
  }

  render() {
    return (
      <div >
        <div className='OperationTopBtn' >
          <button className='Btn' onClick={this.props.handleClear} style={{ borderRadius: '5rem', backgroundColor: 'white', color: 'red' }}>C</button>
          <button className='Btn' onClick={this.props.handleNumClick} value='%' style={this.btnStyle}>%</button>
          <button className='Btn' onClick={this.props.handleNumClick} value='/' style={this.btnStyle}>/</button>
          <button className='Btn' onClick={this.props.handleNumClick} value='*' style={this.btnStyle}>X</button>
        </div>
        <div className='SecondContainer' >
          <div className='NumBtnDiv'>
            <div className='NumBtnInColumn'>
              <button className='Btn' onClick={this.props.handleNumClick} value='1'>1</button>
              <button className='Btn' onClick={this.props.handleNumClick} value='2'>2</button>
              <button className='Btn' onClick={this.props.handleNumClick} value='3'>3</button>
            </div>

            <div className='NumBtnInColumn'>
              <button className='Btn' onClick={this.props.handleNumClick} value='4'>4</button>
              <button className='Btn' onClick={this.props.handleNumClick} value='5'>5</button>
              <button className='Btn' onClick={this.props.handleNumClick} value='6'>6</button>
            </div>

            <div className='NumBtnInColumn'>
              <button className='Btn' onClick={this.props.handleNumClick} value='7'>7</button>
              <button className='Btn' onClick={this.props.handleNumClick} value='8'>8</button>
              <button className='Btn' onClick={this.props.handleNumClick} value='9'>9</button>
            </div>

            <div className='NumBtnInColumn' >
              <button onClick={this.props.handleDelete} className='Btn' style={{ backgroundColor: 'rgb(52, 56, 106)' ,borderRadius:'5rem'}} >←</button>
              <button onClick={this.props.handleNumClick} className='Btn' value='0'>0</button>
              <button onClick={this.props.handleNumClick} className='Btn' value='.'>．</button>
            </div>


          </div>
          <div className='OperationRigthBtn'>
            <div className='OperationRigthBtnPM'>
              <button className='Btn' onClick={this.props.handleNumClick} value='+' style={this.btnStyle} >+</button>
              <button className='Btn' onClick={this.props.handleNumClick} value='-' style={this.btnStyle} >-</button>
            </div>

            <button className='BigEnter' onClick={this.props.handleCalculate} >=</button>


          </div>
        </div>
        </div>

    );
  }
}

export default Buttons;