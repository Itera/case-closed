import React, { Component } from 'react';

export default class Hello extends Component {
  state = {
    weight: 15,
  };

  render() {
    return (
      <div className="text-center">
        <p>The weight of your suitcase is: <br/>
          <span className="weight-text">{this.state.weight}</span> kg</p>
      </div>
    );
  }
}
