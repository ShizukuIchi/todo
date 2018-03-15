import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Todo extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  state = {
    active: this.props.active,
  }
  onEditText = () => {
    this.props.onEdit(this.container.getBoundingClientRect());
  }
  render() {
    const {
      className, text, active, onCheck, isDone, onDelete,
    } = this.props;
    return (
      <div className={className} ref={(r) => { this.container = r; }}>
        <div className={active ? 'active' : 'inactive'}>
          <div className="text">
            <input type="checkbox" checked={isDone} onChange={onCheck} />
            <span>{text}</span>
          </div>
          <div className="button">
            <button onClick={this.onEditText}>edit</button>
            <button onClick={onDelete}>del</button>
          </div>
        </div>
      </div>
    );
  }
}

export default styled(Todo)`
  .active, .inactive {
    padding: 0px 15px;
    border-bottom: solid 1px rgba(0,0,0,.1); 
    height: 50px;
    display: flex;
    justify-content: space-between;
    .text, .button {
      font-size: 24px;
      display: flex;
      align-items: center;
    }
  }
`;
