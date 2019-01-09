import React, { Component } from 'react';

import '../assets/css/App.css';
import Completed from './Completed';
import Incomplete from './Incomplete';
import NavComponent from './NavComponent';
import HomeComponent from './HomeComponent';
import HeaderComponent from './HeaderComponent';
import Model from './Model';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      inputValue: '',
      renderHome: true,
      completedTodo: [],
      modalIsOpen: false,
      isCompleted: false,
      renderCompleted: false,
      renderIncomplete: false
    };
    this.inputRef = React.createRef();
    this.checkboxRef = React.createRef();
  }

  handleComponentRender = text => {
    switch (text) {
      case 'home':
        this.setState({
          renderHome: true,
          renderCompleted: false,
          renderIncomplete: false
        });
        break;
      case 'completed':
        this.setState({
          renderHome: false,
          renderCompleted: true,
          renderIncomplete: false
        });
        break;
      case 'incomplete':
        this.setState({
          renderHome: false,
          renderCompleted: false,
          renderIncomplete: true
        });
        break;
      default:
        this.setState({
          renderHome: true
        });
    }
  };

  submitInput = e => {
    e.preventDefault();
    let updatedTodo = [...this.state.todoList];
    let value = this.inputRef.current.value;
    let date = Date.now().toLocaleString();
    if (value !== '') {
      if (e.keyCode === 13 || e.type === 'click') {
        updatedTodo.unshift({
          todo: value,
          date: date,
          isCompleted: false
        });
        this.setState({ todoList: updatedTodo });
        this.inputRef.current.value = '';
      }
    } else {
      alert('nothing');
    }
  };

  handleDelete = index => {
    let updatedTodo = [...this.state.todoList];
    updatedTodo.splice(index, 1);
    this.setState({
      todoList: updatedTodo
    });
  };

  handleSelected = (bool, index) => {
    bool = !bool;
    let updatedTodo = [...this.state.todoList];
    updatedTodo[index].isCompleted = bool;
    this.setState({
      todoList: updatedTodo
    });
  };

  openModal = index => {
    console.log(index);
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="container todo-container">
        <HeaderComponent />
        <NavComponent handleComponent={this.handleComponentRender} />
        <Model
          openModal={this.openModal}
          afterOpenModal={this.afterOpenModal}
          closeModal={this.closeModal}
          modelToggle={this.state.modalIsOpen}
          data={this.state}
        />
        {this.state.renderHome && (
          <HomeComponent
            inputRef={this.inputRef}
            submitInput={this.submitInput}
            todo={this.state.todoList}
            handleDelete={this.handleDelete}
            handleSelected={this.handleSelected}
            checkboxRef={this.checkboxRef}
            openModal={this.openModal}
          />
        )}
        {this.state.renderCompleted && <Completed todo={this.state.todoList} />}
        {this.state.renderIncomplete && <Incomplete />}
      </div>
    );
  }
}
export default App;
