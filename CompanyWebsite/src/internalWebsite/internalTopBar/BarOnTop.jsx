// noinspection ES6CheckImport

import React, {  lazy, Suspense, Component } from 'react';
import './BarOnTop.css';
import {Link, Routes, Route} from "react-router-dom";
import InternalWrong from '../Wrong.jsx';
import Home from '../internalTabs/Home';
import Empty from "../internalTabs/Empty";

export default class TopBar extends Component {

    state = {files: [], dataReceived: false}

    constructor(props) {
        super(props);
        this.locations = ["Account", "Home", "Company", "Documents", "HR", "News", "Quiz"];
        this.customLocations = [];
    }

    async componentDidMount(){
        window.addEventListener("resize", this.setRemainingHeightForContent);
        if(window.location.pathname.length === 9) window.history.replaceState(null, "New Page Title", "/Internal/Home");
        this.setRemainingHeightForContent();
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.setRemainingHeightForContent);
    }

    //Changes the selected button in the topbar.
    highlightActive = (path) => {
        const oldActiveElements = document.getElementsByClassName('active');
        if (oldActiveElements.length > 0) {
          for (let elem of oldActiveElements){
              elem.classList.remove('active');
          }
        }
        try {
            document.getElementById(path.file).classList.add('active');
            this.setRemainingHeightForContent();
        }
        catch{
            console.log("no such path")
        }
      }

      reloadPage = () => {
            this.setState({dataReceived: true});
      }

      //Adds custom tab to the list. Custom tabs are in the "CustomPages" folder.
      addCustomTabs = (fileName) => {
            if(!this.customLocations.includes(fileName)) this.customLocations.push(fileName);
      }

      removeCustomTabs = (fileName) => {
           if(this.customLocations.includes(fileName)) this.customLocations.splice(fileName,1);
      }

      setRemainingHeightForContent(){
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            try{
                document.getElementById(window.location.pathname.split("/")[2] + "tag").style.height = vh - 50 - (document.getElementById("menu").offsetTop + document.getElementById("menu").offsetHeight) + "px";
            }
            catch{
                document.getElementById("InternalWrongtag").style.height = vh - 50 - (document.getElementById("menu").offsetTop + document.getElementById("menu").offsetHeight) + "px";
            }
      }

      //Tries to create component using specific component name.
      getComponent = (file, Tag) => {
            return (<Route key={file} path={"/" + file} element={
                  <div id={file + "tag"}>
                      <Suspense fallback={<Empty />}>
                          <Tag reloadPage={this.reloadPage} logOut={this.props.logOut}/>
                      </Suspense>
                  </div>
              }/>);
      }

      render(){
          if(localStorage.getItem('Console') === "true") this.addCustomTabs("Console");
          else this.removeCustomTabs("Console");
          return (
                <div className="topbarInternal" id="topbar">
                      <header ><h1 id="topbarHeader" className="internalHeader">Difax</h1></header>
                      <div className="menyDiv" id="menu">
                      <ul id='topbarInternal-ul'>
                      {
                        this.locations.map((file, index) => {
                            if(file === "Account"){
                                return (<li id='topbarInternal-li-Right' className='topbar-li' key={index}><Link id={file} key={index} onClick={() => this.highlightActive({file})} to ={file}> {file} </Link></li>);
                            }
                            else {
                                return (<li id='topbarInternal-li' className='topbar-li' key={index}><Link id={file} key={index} onClick={() => this.highlightActive({file})} to ={file}> {file} </Link></li>);
                            }
                        })
                      }
                      </ul>
                      </div>
                      <Routes>
                          <Route exact path="/" element={<Home/>}/>
                          <Route path="/*" element={<InternalWrong />} />
                          {
                            this.locations.map((file) => {
                                const Tag = lazy(() => import("../InternalTabs/" + file));
                                return this.getComponent(file, Tag)
                            })
                          }
                          {
                            this.customLocations.map((file) => {
                                const Tag = lazy(() => import("../CustomPages/" + file));
                                return this.getComponent(file, Tag)
                            })
                          }
                      </Routes>
                </div>
            )
          }
    }