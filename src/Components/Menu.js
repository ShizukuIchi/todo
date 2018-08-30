import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Menu extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    onSA: PropTypes.func.isRequired,
    onSU: PropTypes.func.isRequired,
    onSC: PropTypes.func.isRequired,
    onCC: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
  };
  onClose = () => {
    this.props.onToggle();
  };
  onClearCompleted = e => {
    e.stopPropagation();
    this.props.onClearCompleted();
    this.props.onToggle();
  };
  onSelectComplete = e => {
    e.stopPropagation();
    this.props.onSelectCompleted();
    this.props.onToggle();
  };
  onSelectUncompleted = e => {
    e.stopPropagation();
    this.props.onSelectUncompleted();
    this.props.onToggle();
  };
  onSelectAll = e => {
    e.stopPropagation();
    this.props.onSelectAll();
    this.props.onToggle();
  };
  render() {
    const { className } = this.props;
    return (
      this.props.show && (
        <div className={className} onClick={this.onClose}>
          <div className="model">
            <button
              style={{ color: 'red' }}
              onClick={this.onClearCompleted}
              type="button"
            >
              Clear Completed
            </button>
            <button
              style={{
                color: this.props.selected === 'all' ? '#1c88ff' : 'black',
              }}
              onClick={this.onSelectAll}
              type="button"
            >
              Select All
            </button>
            <button
              style={{
                color:
                  this.props.selected === 'completed' ? '#1c88ff' : 'black',
              }}
              onClick={this.onSelectComplete}
              type="button"
            >
              Select Completed
            </button>
            <button
              style={{
                color:
                  this.props.selected === 'uncompleted' ? '#1c88ff' : 'black',
              }}
              onClick={this.onSelectUncompleted}
              type="button"
            >
              Select Uncompleted
            </button>
          </div>
        </div>
      )
    );
  }
}

export default styled(Menu)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .model {
    box-shadow: 2px 2px 3px 1px gray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background: white;
    width: 300px;
    padding: 5px;
    button {
      font-size: 20px;
      padding: 0;
      margin-bottom: 0;
      cursor: pointer;
      background: transparent;
      border: 0;
      &:focus {
        outline: none;
      }
    }
    button:not(:last-child) {
      margin-bottom: 5px;
      padding-bottom: 5px;
      border-bottom: solid 1px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 768px) {
    .model {
      width: 250px;
    }
  }
`;
