import React, { Component } from 'react';
import styled from 'styled-components';


class Todo extends Component {
  state = {
    editing: false,
  }
  onEditText = () => {
    this.props.onEdit(this.container.getBoundingClientRect());
    this.setState({
      editing: true,
    });
  }
  render() {
    const {
      className, text, active, onCheck, isDone, onDelete, onEdit,
    } = this.props;
    return (
      <div className={className} ref={r => this.container = r}>
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

const Clone = () => (
  <div className="float" >
    <div>
      <input type="checkbox" />
      <span>text</span>
    </div>
  </div>
);

export default styled(Todo)`
  .active, .inactive {
    height: 40px;
    display: flex;
    justify-content: space-between;
    .text, .button {
      display: flex;
      align-items: center;
    }
  }
`;
