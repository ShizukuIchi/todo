import React, { Component } from 'react';
import styled from 'styled-components';

class EditingTodo extends Component {
  state = {
    text: this.props.text,
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
    });
  }
  componentDidMount() {
    this.props.getRef(this.element);
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
      className, text,
    } = this.props;
    return (
      <div className={className} ref={r => this.element = r}>
        <div className="content">
          <div className="text">
            <span>編輯</span>
            <form onSubmit={this.onSubmit}>
              <input type="text" onChange={this.onChange} value={this.state.text} placeholder={text} ref={r => this.input = r} />
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
