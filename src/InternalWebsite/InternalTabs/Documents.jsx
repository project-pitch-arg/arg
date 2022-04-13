import React, {Component} from 'react';
import "./TabContent.css";
import {basicFetchData} from "../Client/Client";
import axios from 'axios';
import Variables from "../JSONFiles/Variables";


export default class Policy extends Component{

    state = { dataReceived: false, numberOfPages: 0, pageNumber: 1, fileName: null, hidden: true}

    constructor(props){
        super(props);
        this.policy = {};
        this.location = [];
        this.keys = [];
        this.input = "";
    }
    //Adds eventListeners for key presses
    async componentDidMount(){
        await this.getPolicy();
        document.addEventListener("keydown", this._handleKeyDown);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this._handleKeyDown);
    }
    componentDidUpdate(prevProps, prevState){
        this.reloadPage = this.props.reloadPage;
    }
    //Requests and displays specific pdf file from server
    async getPDF(fileName){
        var json = {
            "fileName" : fileName
        }
        axios(`http://localhost:8080/getPDF `, {
                method: "POST",
                responseType: "blob",
                data: json
                //Force to receive data in a Blob Format
              })
                .then(response => {
                  //Create a Blob from the PDF Stream
                  const file = new Blob([response.data], {
                    type: "application/pdf"
                  });
                  //Build a URL from the file
                  const fileURL = URL.createObjectURL(file);
                  //Open the URL on new Window
                  window.open(fileURL);
                })
                .catch(error => {
                  console.log(error);
                });
        this.setState({dataReceived: true});
    }
    //Requests pdf file names from server
    async getPolicy(){
            this.location = await basicFetchData("/getPolicy");
            this.setState({dataReceived: true});
    }
    //Called when a key is pressed
    _handleKeyDown = (event) => {
        this.keys.push(event.key);
        if(event.key !== "o" && event.key !== "p" && event.key !== "e" && event.key !== "n" && event.key !== "Enter"){
            this.keys = [];
        }
        switch( event.key ) {
            case "Enter":
                if(this.checkPressedKeys("o") && this.checkPressedKeys("p") && this.checkPressedKeys("e") && this.checkPressedKeys("n")){
                    this.setState({hidden: !this.state.hidden});
                    this.keys = [];
                }
                break;
            default:
                break;
        }
    }
    //Checks if specific key is pressed down
    checkPressedKeys(key){
        if(this.keys.some(item => key === item)){
            return true;
        }
        return false;
    }
    //Called when input is submitted
    handleInput = (event) => {
        event.preventDefault();
        if(event.target.command.value === Variables.smallConsoleCode){
            localStorage.setItem('Console', true);
            this.reloadPage();
            window.history.replaceState(null, "New Page Title", "/Console");
            window.location.reload(false);
        }
    }

    render(){
        if(this.state.dataReceived) {
            return (
                <div class="newsBlock">
                    <h1 class="underline">Policy Documents</h1>
                  {
                    this.location.map((file) => {
                        return <div class="pdfItemDiv" key={file}><button class="pdfItem" onClick={() => this.getPDF(file)}>{file.split(".")[0]}</button></div>
                    })
                  }{!this.state.hidden ? (
                      <form onSubmit={this.handleInput}>
                        <input class="smallConsole" placeholder="Enter code..." type="text" name="name" id="command"/>
                      </form>) : (null)}
                </div>
            )
        }
        else {
            return (<div>Loading...</div>)
        }

    }
}