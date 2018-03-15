import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    onEdited(this.input.value);
    this.input.value = '';
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
    const {
      className,
    } = this.props;
    return (
      <div className={className} ref={(r) => { this.element = r; }}>
        <div className="content">
          <div className="text">
            <span>編輯</span>
            <form onSubmit={this.onSubmit}>
              <input type="text" onChange={this.onChange} value={this.state.text} ref={(r) => { this.input = r; }} />
            </form>
          </div>
          <div className="button">
            <button onClick={this.onEdited}>done</button>
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
    background: white;
    display: flex;
    justify-content: space-between;
    height: 40px;
    width: 500px;
    .text, .button {
      display: flex;
      align-items: center;
    }
  }
`;
