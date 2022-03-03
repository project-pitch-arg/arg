import React, {  lazy, Suspense, Component } from 'react';
import './TopBar.css';
import {Link} from "react-router-dom";
import Wrong from '../Wrong';
import Home from '../Tabs/Home';
import {fetchData} from '../Client/Client.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class TopBar extends Component {
    state = {files: [], dataRecieved: false}
    constructor(props) {
        super(props);
        this.locations = [];
        this.dropdownLocations = [];
    }
    async componentDidMount(){
        this.highlightActive = this.highlightActive.bind(this);
        this.addTabs = this.addTabs.bind(this);
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
            this.setState({dataRecieved: true});
      }
      render(){
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
                                return (<Route key={file} exact path={"/" + file} element={
                                  <Suspense fallback={<Wrong />}>
                                      <Tag/>
                                  </Suspense>
                              }/>);
                            }
                        )}
                      {
                        this.dropdownLocations.map((file) => {
                            const Tag = lazy(() => import("../Tabs/DropDown/" + file));
                                return (<Route exact path={"/" + file} element={
                                  <Suspense fallback={<Wrong />}>
                                      <Tag/>
                                  </Suspense>
                              }/>);
                        })
                      }
                  }
                  </Routes>
               </BrowserRouter>
            </div>
        )
        }
    }