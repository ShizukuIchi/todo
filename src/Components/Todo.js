import React, { Component } from 'react';
import styled from 'styled-components';
import { styler, tween, easing } from 'popmotion';
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
  componentDidMount() {
    this.TodoStyler = styler(this.container);

    if (this.props.active) {
      this.mount();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        this.mount();
      } else {
        this.unmount();
      }
    }
  }
  onEditText = () => {
    this.props.onEdit(this.container.getBoundingClientRect());
  }
  mount = () => {
    tween({
      from: { height: 0, opacity: 0.5 },
      to: { height: 50, opacity: 1 },
      duration: 400,
      ease: easing.backOut,
    }).start(this.TodoStyler.set);
  }
  unmount = () => {
    tween({
      from: { height: 50, opacity: 1 },
      to: { height: 0, opacity: 0 },
      duration: 300,
    }).start(this.TodoStyler.set);
  }


  render() {
    const {
      className, text, onCheck, isDone, onDelete,
    } = this.props;
    return (
      <div className={className} ref={(r) => { this.container = r; }}>
        <div className="active">
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
  
  overflow: hidden;
  .active {
    padding: 0px 15px;
    border-bottom: solid 1px rgba(0,0,0,.1); 
    height: 50px;
    display: flex;
    justify-content: space-between;    
    .text, .button {
      font-size: 24px;
      display: flex;
      align-items: center;
      input {
        margin-right: 20px;
      }
    }
    .text {
      position: relative;
      &:before {
        display: ${({ isDone }) => (isDone ? 'block' : 'none')}
        content: "";
        position: absolute;
        border: solid 1px black;
        top: 25px;
        bottom: 25px;
        left: 32px;
        animation: complete 500ms forwards;
      }
    }
  }
  @keyframes complete {
    0% { width: 0; }
    100% { width: calc(100% - 30px); }
  }
`;
