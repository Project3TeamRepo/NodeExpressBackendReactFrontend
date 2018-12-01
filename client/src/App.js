import React, { Component } from 'react';
import './App.css';
//import ReactCalendar from './components/Calendar/reactCalendar.js';
import Splash from './components/Splash/Splash.js';

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
          currentPage: "<ReactCalendar />"
      };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
         <Splash />
        </header>
      </div>
    );
  }
}

export default App;
