import TopBar from './TopBar/TopBar';
import "./App.css";
import React, { Component } from 'react';

export default class App extends Component {
    constructor(props) {
          super(props);
          this.state = { width: 0, height: 0 };
          this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        }

        componentDidMount() {
          this.updateWindowDimensions();
          window.addEventListener('resize', this.updateWindowDimensions);
          document.title = "Rozk AI";
          document.body.style.overflow = "hidden"
        }

        componentWillUnmount() {
          window.removeEventListener('resize', this.updateWindowDimensions);
        }

        updateWindowDimensions() {
          this.setState({ width: window.innerWidth, height: window.innerHeight });

        }

  render(){
      return (
        <div className="App" style={{height: this.state.height, overflowY: 'scroll'}}>
            <div class="Login-component">
                <TopBar />
             </div>
        </div>
      );
    }
}


