import "./App.css";
import React, { lazy, Suspense,Component } from 'react';
import Login from "./CustomPages/LogIn/LogInPage";
import {getAccountData} from "./CustomPages/LogIn/LogIn";

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = { width: 0, height: 0,loggedIn: false };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    async componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      document.title = "Difax";
      document.body.style.overflow = "hidden"
      try {
            var json = JSON.parse(localStorage.getItem("user"));
            if(json !== null && await getAccountData(json)){
               this.setState({loggedIn: true})
            }
            else {
                this.setState({loggedIn: false})
            }
      }
      catch {
            this.setState({loggedIn: false})
      }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    logIn = () =>{
        this.setState({loggedIn: true});
    }

    logOut = () =>{
        localStorage.removeItem("user");
        this.setState({loggedIn: false});
    }

    loadComponent(Tag){
        <Suspense fallback={Tag = Login}>
           Tag = lazy(() => import("./TopBar/TopBar"));
        </Suspense>
    }
    render(){
      var Tag = Login;
      if(this.state.loggedIn){
          Tag = lazy(() => import("./TopBar/TopBar"));
      }
      return (
        <div className="App">
            <div className="Login-component" style={{height: this.state.height, overflowY: 'scroll'}}>
                <Suspense fallback={<Login/>}>
                     <Tag logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn}/>
                </Suspense>
             </div>
        </div>
      );
    }
}


