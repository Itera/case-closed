import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import './motion.css';

class Motion extends Component {
  render() {

    return (
      <div className="text-center">
        <div id="wrapper">
          <div id="controls">
            <Button id="left" className="movements_control" variant="light">
              <span className="fas fa-arrow-left fa-10x"></span>
            </Button>
            <Button id="up" className="movements_control" variant="light">
              <span className="fas fa-arrow-up fa-10x"></span>
            </Button>
            <Button id="down" className="movements_control" variant="light">
              <span className="fas fa-arrow-down fa-10x"></span>
            </Button>
            <Button id="right" className="movements_control" variant="light">
              <span className="fas fa-arrow-right fa-10x"></span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Motion;
