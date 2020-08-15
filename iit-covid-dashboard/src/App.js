import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render () {
    const list = [
      {
      "name": "hot dog",
      "type": "food",
      "nutrition": "poor",
      "objectID": 0
      },
      {
        "name": "salad",
        "type": "not food",
        "nutrition": "poor",
        "objectID": 1
      }
    ];
    return (
      <div className="App">
      {list.map(item =>
        <div key={item.objectID}>
          <span>
            {item.name},
          </span>
          <span>
            {item.type}
          </span>
        </div>
      )}
      </div>
    );
  }
}

export default App;