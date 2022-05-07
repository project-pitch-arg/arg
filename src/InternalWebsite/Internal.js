import "./internal.css";
import React, { Component } from 'react';
import Login from "./CustomPages/LogIn/LogInPage";
import {getAccountData} from "./CustomPages/LogIn/LogIn";
import BarOnTop from "./InternalTopBar/BarOnTop";

export default class Internal extends Component {

    constructor(props) {
      super(props);
      this.state = { width: 0, height: 0,loggedIn: false };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      this.loggedIn = localStorage.getItem("loggedIn");
    }

    //When Component mounts it checks if the user is logged in.
    async componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      document.title = "Difax";
      document.body.style.overflow = "hidden"
      try {
          var json = JSON.parse(localStorage.getItem("user"));
          if(json !== null && await getAccountData(json)){
             this.setState({loggedIn: true})
             this.logIn();
          }
          else {
              this.setState({loggedIn: false})
              this.logOut();
          }
      }
      catch {
          this.setState({loggedIn: false})
          this.logOut();
      }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    logIn = () => {
        localStorage.setItem("loggedIn", true);
        this.setState({loggedIn: true});
    }

    logOut = () => {
        localStorage.removeItem("user");
        localStorage.setItem("loggedIn", false);
        this.setState({loggedIn: false});
    }

    render(){
        return (
        <div className="InternalApp">
            <div className="Login-component" style={{height: this.state.height, overflowY: 'scroll'}}>
                     { localStorage.getItem("loggedIn") === "true"?
                     <BarOnTop logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn}/>
                     :
                     <Login logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn}/>
                     }
             </div>
        </div>
        );
    }
}


