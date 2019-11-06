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
        <div style={{ height: "2.5rem", width: "30rem", margin: '0px 0px 0px 2rem' }}>
          <button style={{ border: 'none', background: 'transparent', color: 'white', fontSize: "2.5rem" }} onClick={this.props.handleHistroy}>☰</button>
        </div>
        <div style={{ height: "2.5rem", width: "29rem", fontSize: "2.5rem", justifyContent: 'flex-end'}}>
          {this.props.displaytext}
        </div>
        <div style={{ height: "4.7rem", width: "29rem", justifyContent: 'flex-end', fontSize: "4rem" ,overflow: 'hidden' , verticalAlign:'text-top'}}>
          {this.props.displaytext2}
        </div>
      </div>
    );
  }
}

export default DisplayBlock;