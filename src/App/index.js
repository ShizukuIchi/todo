import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import setting from '../assets/settings.svg';
import Todo from '../Components/Todo';
import Menu from '../Components/Menu';
import EditingTodo from '../Components/EditingTodo';
import cross from '../assets/cross.svg';
import arrow from '../assets/left-arrow.svg';

class App extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
  }
  state = {
    todos: [
      { key: '1', data: { text: 'react', isDone: false } },
      { key: '3', data: { text: 'redux', isDone: false } },
      { key: '5', data: { text: 'rxjs', isDone: false } },
      { key: '7', data: { text: 'expo', isDone: true } },
      { key: '9', data: { text: 'create-react-app', isDone: false } },
    ],
    value: '',
    editing: {
      position: { x: -1, y: -1 },
      key: '',
    },
    selected: 'all', // all, completed, uncompleted
  };

  onCheck = (key) => {
    this.setState({
      todos: this.state.todos.map(todo => (
        todo.key === key
          ? ({
            key,
            data: {
              text: todo.data.text,
              isDone: !todo.data.isDone,
            },
          })
          : todo
      )),
    });
  }
  onDelete = (key) => {
    setTimeout(() => {
      this.setState({
        todos: this.state.todos.filter(todo => todo.key !== key),
      });
    }, 200);
  }
  onEdit = (key, { x, y }) => {
    this.setState({
      editing: {
        position: { x, y },
        key,
      },
    });
  }
  onEdited = (text) => {
    const todoIndex = this.state.todos.findIndex(t => t.key === this.state.editing.key);
    const { key, data: { isDone } } = this.state.todos[todoIndex];
    this.setState({
      todos: [
        ...this.state.todos.slice(0, todoIndex),
        { key, data: { text, isDone } },
        ...this.state.todos.slice(todoIndex + 1),
      ],
      editing: {
        position: { x: -1, y: -1 },
        key: '',
      },
    });
  }
  onMenuToggle = () => {
    this.setState({
      editing: {
        key: this.state.editing.key ? '' : 'menu',
        position: { x: -1, y: -1 },
      },
    });
  }
  setSelected = (selected) => {
    this.setState({
      selected,
    });
  }
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
            key: new Date() + new Date().getMilliseconds(),
            data: {
              text: e.target.lastChild.value,
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
  clearCompleted = () => {
    const { todos } = this.state;
    this.setState({
      selected: 'uncompleted',
    });
    setTimeout(() => this.setState({
      todos: todos.filter(todo => !todo.data.isDone),
    }), 300);
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
    let editingText;
    if (this.state.editing.key === 'menu') {
      editingText = '';
    } else {
      editingText = this.state.editing.key
        ? this.state.todos.find(t => t.key === this.state.editing.key).data.text
        : '';
    }
    const clearButton = value && <ClearButton onClick={this.clearValue}><img src={cross} alt="x" /></ClearButton>;
    const todoElements = todos.map(({ key, data: { text, isDone } }) => (
      <Todo
        key={key}
        text={text}
        isDone={isDone}
        active={this.isTodoActive(isDone, selected)}
        onCheck={() => this.onCheck(key)}
        onDelete={() => this.onDelete(key)}
        onEdit={position => this.onEdit(key, position)}
      />
    ));
    console.log(this.state.editing.key, 'key');
    return (
      <section className={className}>
        <section ref={(r) => { this.wrapper = r; }} className={this.state.editing.key ? 'wrapper-editing' : 'wrapper'}>
          <header>
            <h1 className="todo-title">TODOS</h1>
            <section className="input-container">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="todo"><img src={arrow} alt="edit" /></label>
                <input id="todo" type="text" placeholder="what to do..." value={value} onChange={this.handleChange} />
              </form>
              {clearButton}
            </section>
            <section className="settings">
              <img onClick={this.onMenuToggle} className="settings-icon" src={setting} alt="settings" />
            </section>
          </header>
          <section className="content">
            {todoElements}
          </section>
          <footer>
            <div className="clear-completed">
              <button type="button" onClick={this.clearCompleted}>Clear completed</button>
            </div>
            <div className="selected">
              <button type="button" style={{ color: this.state.selected === 'all' ? '#1c88ff' : 'black' }} onClick={() => this.setSelected('all')}>all</button>
              <button type="button" style={{ color: this.state.selected === 'completed' ? '#1c88ff' : 'black' }} onClick={() => this.setSelected('completed')}>Completed</button>
              <button type="button" style={{ color: this.state.selected === 'uncompleted' ? '#1c88ff' : 'black' }} onClick={() => this.setSelected('uncompleted')}>Uncompleted</button>
            </div>
          </footer>
        </section>
        <EditingTodo
          text={editingText}
          position={this.state.editing.position}
          onEdited={this.onEdited}
        />
        <Menu
          show={this.state.editing.key === 'menu'}
          onToggle={this.onMenuToggle}
          onClearCompleted={this.onClearCompleted}
          onSA={() => this.setSelected('all')}
          onSC={() => this.setSelected('completed')}
          onSU={() => this.setSelected('uncompleted')}
          onCC={this.clearCompleted}
          selected={this.state.selected}
        />
      </section>
    );
  }
}

const ClearButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  color: white;
  font-size: 1em;
  &:focus {
    outline: none;  
  }
  img {
    width: 20px;
    height: 20px;
  }
  @media (max-width:768px) {
    display: none;
  }
`;

export default styled(App)`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 80px; 
  display: flex;
  justify-content: center;

  .todo-title {
    position: absolute;
    margin: 0;
    color: white;
    text-shadow: 3px 3px 3px rgba(150, 150, 151, .5);
    line-height:60px;
    transform: translateY(-50px);
  }
  
  .wrapper, .wrapper-editing {
    position: relative;
    margin-bottom: auto;
    transition-duration: .5s;
    background-color: white;
    width: 500px;
    box-shadow: 4px 10px 25px -8px rgba(0,0,0,0.75);
    border-radius: 2px;
  }
  .wrapper-editing {
    pointer-events: none;
    filter: blur(2px);
    opacity: 0.7;
  }

  header {
    box-shadow: 0 2px 2px -2px gray;
    border-radius: 2px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 14px; 
    background-color: #6cb9f2;
    .input-container {
      flex-grow: 1;
      margin-right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      form {
        display: flex;
        margin-right: 15px;
        width: 350px;
      }
      label {
        transform: rotate(180deg);
        img {
          opacity: 0.7;
          width: 18px;
          height: 18px;
        }
      }
      input {
        font-size: 1em;
        margin: 0;
        margin-left: 15px;
        height: 100%;
        background-color: transparent;
        border: 0;
        &::placeholder {
          font-style: italic;
          opacity: 0.5;
        }
        &:focus {
          outline: none;
        }
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
  footer {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    padding: 0 7px;
    button {
      cursor: pointer;
      background: transparent;
      border: 0;
      &:focus {
        outline: 0;
      }
      &:hover {
        animation: on-button-hover 800ms forwards;
      }
    }
    .clear-completed {
      display: flex;
      justify-content: center;
      button {
        color: #b60000;
      }
    }
    .selected {
      display: flex;
      justify-content: space-between;
    }
  }
  @keyframes on-button-hover {
    0% { transform: scale(1);}
    20% { transform: scale(1.1);}
    40% { transform: scale(1);}
    100% { transform: scale(1);}
  }

  @media (max-width:768px) {
    .todo-title {
      transform: translateY(-38px);
    }
    .wrapper, .wrapper-editing {
      width: 300px;
    }
    header {
      height: 40px;
      padding: 2px 10px;
      .input-container {
        height: 40px;      
        form {
          margin-right: 5px;
          width: 220px;
          input {
            font-size: .6em;
            margin-left: 0;
            &::placeholder {
              font-style: italic;
              opacity: 0.5;
              color: gray;
            }
          }
          label {
            display: none;
          }
        }
      }
    }
    footer {
      display: none; 
    }
  }
`;

