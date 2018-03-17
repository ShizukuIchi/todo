import React, { Component } from 'react';
import styled from 'styled-components';
import { styler, easing, tween } from 'popmotion';

class EditingTodo extends Component {
  state = {
    text: this.props.text,
  }
  componentDidMount() {
    this.styler = styler(this.element);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.text) {
      this.setState({
        text: nextProps.text,
      });
      this.mount(nextProps.position);
    } else {
      this.unmount();
    }
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
  onChange = ({ target: { value } }) => {
    this.setState({
      text: value,
    });
  }
  mount = ({ x, y }) => {
    this.element.style.visibility = '';
    tween({
      from: { top: y, left: x, opacity: 0 },
      to: { top: y - 5, left: x + 5, opacity: 1 },
      duration: 500,
      ease: easing.backOut,
    }).start(this.styler.set);
  }
  unmount = () => {
    setTimeout(() => {
      this.element.style.visibility = 'hidden';
    }, 500);
    const x = this.styler.get('left');
    const y = this.styler.get('top');
    tween({
      from: { top: y, left: x, opacity: 1 },
      to: { top: y + 5, left: x - 5, opacity: 0 },
      duration: 500,
      ease: easing.backOut,
    }).start(this.styler.set);
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
  /* visibility: hidden; */
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
