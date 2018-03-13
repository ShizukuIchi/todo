import React, { Component } from 'react';
import styled from 'styled-components';

class Wrapper extends Component {
  state = { }
  render() {
    const { className } = this.props;
    return (
      <div className={className} />
    );
  }
}

export default styled(Wrapper)`
  width: 500px;
  height: 500px;
  background-color: #FFF;
  box-shadow: 4px 10px 25px -8px rgba(0,0,0,0.75);
`;
