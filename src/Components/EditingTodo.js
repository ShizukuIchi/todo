import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import pencil from '../assets/pencil.svg';

class EditingTodo extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    getRef: PropTypes.func.isRequired,
    onEdited: PropTypes.func.isRequired,
  };
  state = {
    text: this.props.text,
  }
  componentDidMount() {
    this.props.getRef(this.element);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
    });
  }
  onEdited = () => {
    const { onEdited } = this.props;
    if (this.input.value) {
      onEdited(this.input.value);
      this.input.value = '';
    } else {
      alert('Write something please');
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.onEdited();
  }
  onChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }
  render() {
    const { className } = this.props;
    return (
      <div className={className} ref={(r) => { this.element = r; }}>
        <div className="content">
          <div className="text">
            <img src={pencil} alt="edit" />
            <form onSubmit={this.onSubmit}>
              <input type="text" onChange={this.onChange} value={this.state.text} ref={(r) => { this.input = r; }} />
            </form>
          </div>
          <div className="button">
            <button onClick={this.onEdited}>
              done
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default styled(EditingTodo)`
  opacity: 0;
  visibility: ${({ text }) => (text ? '' : 'hidden')};
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    border-radius: 2px;
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.5);
    padding: 15px;
    background: white;
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 500px;
    .text, .button {
      display: flex;
      align-items: center;
      input {
        margin-left: 15px;
        font-size: 24px;
        border: 0;
        &:focus {
          outline: none;
        }
      }
      img {
        height: 30px;
        width: 30px;
      }
    }
  }
`;
