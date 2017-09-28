import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CellContainer from './myapp/CellContainer';

class App extends Component {

  render() {
    let rowCount = 10;
    let colCount = 10;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>s
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reloadAAA.
        </p>
        <CellContainer rowCount={rowCount} colCount={colCount} />
      </div>
    );
  }
}

export default App;
