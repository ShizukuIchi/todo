import React, { Component } from 'react';
import styled from 'styled-components';

import { Wrapper } from '../Components';

class App extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Wrapper />
      </div>
    );
  }
}


export default styled(App)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

