import React, {  lazy, Suspense, Component } from 'react';
import './TopBar.css';
import {Link} from "react-router-dom";
import Wrong from '../Wrong';
import Home from '../Tabs/Home';
import {fetchData} from '../Client/Client.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class TopBar extends Component {
    state = {files: [], dataReceived: false}
    constructor(props) {
        super(props);
        this.locations = [];
        this.dropdownLocations = [];
        this.customLocations = [];
        this.addCustomTabs("Quiz");
    }

    async componentDidMount(){
        await this.addTabs("/src/Tabs/", this.locations);
        await this.addTabs("/src/Tabs/DropDown/",this.dropdownLocations);
    }

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

      getComponent = (file, Tag) => {
            return (<Route key={file} exact path={"/" + file} element={
                  <Suspense fallback={<Wrong />}>
                      <Tag reloadPage={this.reloadPage} logOut={this.props.logOut}/>
                  </Suspense>
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
                <div class="topbar">
                    <BrowserRouter>
                      <ul id='topbar-ul'>
                      {
                        this.locations.map((file, index) => {
                            if(file === "Account"){
                                return (<li id='topbar-li-Right' class='topbar-li' key={index}><Link id={file} key={index} onClick={() => this.highlightActive({file})} to ={file}> {file} </Link></li>);
                            }
                            else {
                                return (<li id='topbar-li' class='topbar-li' key={index}><Link id={file} key={index} onClick={() => this.highlightActive({file})} to ={file}> {file} </Link></li>);
                            }
                        })
                      }
                        <li id="Dropdown" key="Dropdown">
                            <div class="dropdown">
                            <button class="dropdown-button">Information</button>
                            <div class="dropdown-content">{
                                this.dropdownLocations.map((file) => {
                                        return (<Link id={file} key={file.toString()} onClick={() => this.highlightActive({file})} to ={file}> {file} </Link>);
                                })
                                }
                                </div>
                            </div>
                        </li>
                      </ul>
                      <Routes>
                          <Route path="" element={<Home/>}/>
                          <Route path="*" element={<Wrong />} />
                          {
                            this.locations.map((file) => {
                                const Tag = lazy(() => import("../Tabs/" + file));
                                return this.getComponent(file, Tag);
                            })
                          }
                          {
                            this.dropdownLocations.map((file) => {
                                const Tag = lazy(() => import("../Tabs/DropDown/" + file));
                                return this.getComponent(file, Tag);
                            })
                          }
                          {
                            this.customLocations.map((file) => {
                                const Tag = lazy(() => import("../CustomPages/" + file));
                                return this.getComponent(file, Tag);
                            })
                          }
                      }
                      </Routes>
                   </BrowserRouter>
                </div>
            )
          }
    }