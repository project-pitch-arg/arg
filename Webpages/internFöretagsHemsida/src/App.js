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
      document.title = "Rozk AI";
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
            console.log("logOut");
            this.setState({loggedIn: false});
    }
    loadComponent(Tag){
        <Suspense fallback={Tag = Login}>
           Tag = lazy(() => import("./TopBar/TopBar"));
        </Suspense>
    }
  render(){
      var Tag = Login;
      console.log(this.state.loggedIn);
      if(this.state.loggedIn){
          console.log("loggedIn");
          Tag = lazy(() => import("./TopBar/TopBar"));
      }
      return (
        <div className="App">
            <div class="Login-component" style={{height: this.state.height, overflowY: 'scroll'}}>
                <Suspense fallback={<Login/>}>
                     <Tag logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn}/>
                </Suspense>
             </div>
        </div>
      );
    }
}


