import React, { Component } from 'react';


class DisplayBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="display" >
        <div style={{height:"2.5rem",width:"30rem" , margin:'0px 0px 0px 1rem'}}>
          <button style={{border:'none',background:'transparent' ,color:'white',fontSize:"2.5rem"}}>☰</button>
          </div>
        <div style={{height:"2.5rem",width:"30rem",fontSize:"2.5rem",justifyContent:'flex-end', margin:'0px 1rem 0px 0px'}}>
        40+8.5
          </div>
        <div style={{height:"4.7rem",width:"30rem",justifyContent:'flex-end',margin:'0px 1rem 0px 0px',fontSize:"4.5rem"}}>
          48.5
          </div>
      </div>
    );
  }
}

export default DisplayBlock;