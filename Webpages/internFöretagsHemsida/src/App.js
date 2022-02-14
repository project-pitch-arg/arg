import TopBar from './TopBar/TopBar';
import Header from './Header/Header';
import "./App.css";
import React, { Component } from 'react';

export default class App extends Component {

   componentDidMount(){
      document.title = "Rozk AI";
   }
  render(){
      return (
        <div className="App">
           <Header />
            <TopBar />
        </div>
      );
    }
}


