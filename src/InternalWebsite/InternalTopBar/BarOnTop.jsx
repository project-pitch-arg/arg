import React, {  lazy, Suspense, Component } from 'react';
import './BarOnTop.css';
import {Link} from "react-router-dom";
import InternalWrong from '../Wrong';
import Home from '../InternalTabs/Home';
import {fetchData} from '../Client/Client.jsx';
import {  Routes, Route } from 'react-router-dom';

export default class TopBar extends Component {

    state = {files: [], dataReceived: false}

    constructor(props) {
        super(props);
        this.locations = [];
        this.customLocations = [];
    }

    async componentDidMount(){
        await this.addTabs("/InternalTabs/", this.locations);
        window.addEventListener("resize", this.setRemainingHeightForContent);
        if(window.location.pathname.length === 9) window.history.replaceState(null, "New Page Title", "/Internal/Home");
        this.setRemainingHeightForContent();

    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.setRemainingHeightForContent);
    }

    //Changes the selected button in the topbar.
    highlightActive = (path) => {
        var oldActiveElements = document.getElementsByClassName('active');
        if (oldActiveElements.length > 0) {
          for (let elem of oldActiveElements){
              elem.classList.remove('active');
          }
        }
        try {
            document.getElementById(path.file).classList.add('active');
        }
        catch{
            console.log("no such path")
        }
      }

      //Request for all tabs from the server and adds them to the list.
      addTabs = async (path, location) => {
            var json = {
                data: path
            }
            const response = await fetchData('/getFiles', json);
            const data = await response.json();
            for (var i = 0; i < data.files.length; i++) {
                    location.push(data.files[i]);
            }

            this.setState({dataReceived: true});
      }

      reloadPage = () => {
            this.setState({dataReceived: true});
      }

      //Adds custom tab to the list. Custom tabs are in the "CustomPages" folder.
      addCustomTabs = (fileName) => {
            if(!this.customLocations.includes(fileName)){
                this.customLocations.push(fileName);
            }
      }

      removeCustomTabs = (fileName) => {
           if(this.customLocations.includes(fileName)){
               this.customLocations.splice(fileName,1);
           }
      }

      setRemainingHeightForContent(){
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            try{
                document.getElementById(window.location.pathname.split("/")[2] + "tag").style.height = vh - 50 - (document.getElementById("menu").offsetTop + document.getElementById("menu").offsetHeight) + "px";
            }
            catch{
                window.location.reload();
            }
      }

      //Tries to create component using specific component name.
      getComponent = (file, Tag) => {
            return (<Route key={file} path={"/" + file} element={
                  <div id={file + "tag"}>
                      <Suspense fallback={<InternalWrong />}>
                          <Tag reloadPage={this.reloadPage} logOut={this.props.logOut}/>
                      </Suspense>
                  </div>
              }/>);
      }

      render(){
          if(localStorage.getItem('Console') === "true"){
            this.addCustomTabs("Console");
          }
          else {
            this.removeCustomTabs("Console");
          }
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
                          <Route exact path="/*" element={<InternalWrong />} />
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
                      }
                      </Routes>
                </div>
            )
          }
    }