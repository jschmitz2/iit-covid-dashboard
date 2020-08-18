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
      <div className="page">
        <div className="interactions">
          <h1>Sample Heading 1</h1>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
        </Search>
        </div>
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

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  )
}


const Table = ({ list, searchTerm, isSearched, onDismiss }) =>
  list.filter(isSearched(searchTerm))
    .map(item =>
      <div key={item.getKey()} className="table-row">
        <span>{item.getName()}</span>
        <span>
          <Button
            onClick={
              () => onDismiss(item.getKey())
            }
          >
            {"Dismiss " + item.getName()}
          </Button>
        </span>
      </div>)

class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    )
  }
}

// Page 94 of text

export default App;