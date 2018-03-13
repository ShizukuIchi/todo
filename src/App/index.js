import React, { Component } from 'react';
import styled from 'styled-components';

import setting from '../assets/settings.svg';

class App extends Component {
  state = {
    todos: [
      { key: '1', data: { text: 'react', isDone: false } },
      { key: '2', data: { text: 'react-native', isDone: false } },
      { key: '3', data: { text: 'redux', isDone: false } },
      { key: '4', data: { text: 'react-redux', isDone: false } },
      { key: '5', data: { text: 'rxjs', isDone: false } },
      { key: '6', data: { text: 'create-react-native-app', isDone: false } },
      { key: '7', data: { text: 'expo', isDone: true } },
      { key: '8', data: { text: 'create-react-app', isDone: false } },
    ],
    value: '',
    selected: 'all', // all, completed, uncompleted
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value) {
      this.setState({
        value: '',
        todos: [
          {
            key: new Date(),
            data: {
              text: e.target.firstChild.value,
              isDone: false,
            },
          },
          ...this.state.todos,
        ],
      });
    }
  }
  clearValue = () => {
    this.setState({ value: '' });
  }
  isTodoActive = (isDone, selected) => {
    if (selected === 'all') {
      return true;
    } else if (selected === 'completed') {
      return isDone === true;
    }
    return isDone === false;
  }
  render() {
    const { className } = this.props;
    const { todos, value, selected } = this.state;

    const clearButton = value && <ClearButton onClick={this.clearValue}>X</ClearButton>;
    const todoElements = todos.map(({ key, data: { text, isDone } }) => (
      <Todo key={key} text={text} isDone={isDone} active={this.isTodoActive(isDone, selected)} />
    ));

    return (
      <section className={className}>
        <section className="wrapper">
          <h1 className="todo-title">todos</h1>
          <header>
            <section className="input-container">
              <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="what to do..." value={value} onChange={this.handleChange} />
              </form>
              {clearButton}
            </section>
            <section className="settings">
              <img className="settings-icon" src={setting} alt="settings" />
            </section>
          </header>
          <section className="content">
            {todoElements}
          </section>
          <footer>
            hi i am footer
          </footer>
        </section>
      </section>
    );
  }
}

const ClearButton = styled.button`
  background-color: transparent;
  border: 0;
  color: white;
  font-size: 1em;
`;
const Todo = ({ text, active }) => (
  <div className={active ? 'todo-active' : 'todo-inactive'}>
    <span>{`${text} `}</span>
  </div>
);


export default styled(App)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;  

  .todo-title {
    position: absolute;
    margin: 0;
    color: white;
    text-shadow: 3px 3px 3px rgba(150, 150, 151, .5);
    transform: translate(30px ,-55px);
  }

  .wrapper {
    background-color: white;
    width: 500px;
    box-shadow: 4px 10px 25px -8px rgba(0,0,0,0.75);
    border-radius: 2px;
  }

  header {
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px; 
    background-color: pink;
    .input-container {
      flex-grow: 1;
      margin-right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      input {
        font-size: 1em;
        margin: 0;
        height: 100%;
        background-color: transparent;
        border: 0;
      }
      .clear-icon {
        width: 30px;
        height: 30px;
      }
    }
    .settings {
      height: 30px;
      .settings-icon {
        width: 30px;
        height: 30px;
      }
    }
  }
  .content {
    div {
      height: 30px;
      span {
        color: black;
      }
    }
  }
`;

