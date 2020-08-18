import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Food {
  constructor(name, type, key) {
    this.name = name;
    this.type = type;
    this.key = key;
  }

  getName() {
    return (this.name + " " + this.name);
  }

  getType() {
    return this.type;
  }

  getKey() {
    return this.key;
  }

}

const list = [
  new Food("hot dog", "food", 0),
  new Food("burrito", "food", 1)
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: ''
      // Every time you modify this.state of a component,
      // the component will redraw.
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(
      item => item.getKey() != id);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  isSearched(searchTerm) {
    return function (item) {
      return item.getName().toLowerCase().includes(searchTerm.toLowerCase());
    }
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Search
          value={searchTerm.toLocaleLowerCase()}
          onChange={this.onSearchChange}
        />
        <Search
          value={searchTerm.toUpperCase()}
          onChange={this.onSearchChange}
        />
        <Table
          list={list}
          searchTerm={searchTerm}
          isSearched={this.isSearched}
          onDismiss={this.onDismiss}
        />
      </div>
    )
  }
}

class Search extends Component {
  render() {
    console.log(this);
    const { value, onChange } = this.props;
    return (
      <form>
        <input
          type="text"
          value={value}
          onChange={onChange} />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    console.log(this);
    const { list, searchTerm, isSearched, onDismiss } = this.props;
    return (
      list.filter(isSearched(searchTerm))
        .map(item =>
          <div key={item.getKey()}>
            <span>{item.getName()}</span>
            <span>
              <button
                onClick={
                  () => onDismiss(item.getKey())
                } type="button">
                Button
                </button>
            </span>
          </div>)
    )
  }
}

// Page 79 of text

export default App;