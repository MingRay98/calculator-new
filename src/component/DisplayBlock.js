import React, { Component } from 'react';


class DisplayBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div className='DisplayBlock' >
      {this.props.Component}
    </div>
    );
  }
}

export default DisplayBlock;