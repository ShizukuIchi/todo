import React, { Component } from 'react';
import styled from 'styled-components';
import { styler, tween, easing } from 'popmotion';
import PropTypes from 'prop-types';

import pencil from '../assets/pencil.svg';
import rubbish from '../assets/rubbish.svg';

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
    this.todoStyler = styler(this.container);

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
  onDelete = () => {
    this.unmount();
    this.props.onDelete();
  }
  onEditText = () => {
    this.props.onEdit(this.container.getBoundingClientRect());
  }
  mount = () => {
    const w = window.innerWidth > 768 ? 50 : 30;
    this.animation = tween({
      from: { height: 0, opacity: 0.5 },
      to: { height: w, opacity: 1 },
      duration: 400,
      ease: easing.backOut,
    }).start(this.todoStyler.set);
  }
  unmount = () => {
    const w = window.innerWidth > 768 ? 50 : 30;
    this.animation = tween({
      from: { height: w, opacity: 1 },
      to: { height: 0, opacity: 0 },
      duration: 200,
    }).start(this.todoStyler.set);
  }


  render() {
    const {
      className, text, onCheck, isDone,
    } = this.props;
    return (
      <div className={className}>
        <div className="active" ref={(r) => { this.container = r; }}>
          <div className="text">
            <input type="checkbox" checked={isDone} onChange={onCheck} />
            <span>{text}</span>
          </div>
          <div className="button">
            <button onClick={this.onEditText}>
              <img src={pencil} alt="edit" />
            </button>
            <button onClick={this.onDelete}>
              <img src={rubbish} alt="del" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default styled(Todo)`
  overflow: hidden;
  border-bottom: solid 1px rgba(0,0,0,.1); 
  &:last-child {
    box-shadow: 0 1px 2px -1px rgba(0,0,0,.5);
  }
  .active {
    padding: 0px 15px;
    height: 0;
    display: flex;
    justify-content: space-between;    
    .text, .button {
      font-size: 24px;
      display: flex;
      align-items: center;
      input {
        width: 15px;
        height: 15px;
        margin: 0;
        margin-right: 20px;
      }
    }
    .text {
      margin-right: 10px;
      position: relative;
      &:before {
        display: ${({ isDone }) => (isDone ? 'block' : 'none')};
        content: "";
        position: absolute;
        border: solid 1px black;
        top: 50%;
        left: 32px;
        animation: complete 500ms forwards;
      }
      span {
        overflow: hidden;
        max-width: 350px;
        white-space: nowrap; 
        text-overflow: ellipsis;      
      }
      
    }
    &:hover button {
      visibility: visible;
    }
    button {
      opacity: 0.7;
      cursor: pointer;
      visibility: hidden;
      background: transparent;
      border: 0;
      &:focus {
        outline: none;
      }
      &:hover {
        animation: on-button-hover 600ms infinite;
      }
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
  @keyframes complete {
    0% { width: 0; }
    100% { width: calc(100% - 30px); }
  }
  @keyframes on-button-hover {
    0% { transform: scale(1);}
    20% { transform: scale(1.1);}
    40% { transform: scale(1);}
    100% { transform: scale(1);}
  }
  @media (max-width:768px) {
    .active {
      padding: 0 10px;
      .text {
        margin-right: 0;
        &:before {
          left: 26px; 
        }
        font-size: .6em;
        input {
          margin-right: 8px;
        }
        span {
          max-width: 210px;
        }
      }
      button {
        &:first-child {
          margin-right: 7px;
        }
        padding: 0;
        visibility: visible;
      }
    }
  }
`;
