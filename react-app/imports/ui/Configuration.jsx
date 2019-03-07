import React, { Component } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

class Configuration extends Component {
  render() {

    return (
      <div className="text-center">
        <label htmlFor="luggage-tag">Text for luggage tag</label>
        <InputGroup>
          <FormControl id="luggage-tag" as="textarea" aria-label="With textarea" />
        </InputGroup>
      </div>
    );
  }
}

export default Configuration;
