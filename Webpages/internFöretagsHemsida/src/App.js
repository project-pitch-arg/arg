import TopBar from './TopBar/TopBar';
import "./App.css";
import React, { Component } from 'react';

export default class App extends Component {

   componentDidMount(){
      document.title = "Rozk AI";
      document.body.style = 'background: #006080;';
   }
  render(){
      return (
        <div className="App">
             <TopBar />
        </div>
      );
    }
}


