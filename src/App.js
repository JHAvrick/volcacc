import React, { Component } from 'react';
import './App.css';

import Volca from "./components/volca/volca";

class App extends Component {
  constructor(){
    super();

    this.state = {
      cutoffPosition: 5    
    }
  }


  render() {
    return (
      <div className="App">
        <div></div>
        <Volca />
        <div></div>
      </div>
    );
  }
}

export default App;
