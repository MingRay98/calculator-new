import React, { Component } from 'react';
import '../App.css';

class DisplayBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Display" >
        <div className='Display1'>
          <button style={{ fontSize: "2rem" , width:'3rem' , height:'3rem'  }} className='Btn' onClick={this.props.handleHistroy}>☰</button>
        </div>
        <div style={{ fontSize: "2.5rem", justifyContent: 'flex-end'}} className='Display1' >
          {this.props.displaytext}
        </div>
        <div style={{ justifyContent: 'flex-end' ,overflow: 'hidden'}} className='Display2'>
          {this.props.displaytext2}
        </div>
      </div>
    );
  }
}

export default DisplayBlock;