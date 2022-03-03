import React, {Component} from 'react';
import '../TabContent.css';
import {basicFetchData} from "../../Client/Client";
import axios from 'axios';


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
        document.addEventListener("keyup", this._handleKeyUp);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this._handleKeyDown);
        document.removeEventListener("keyup", this._handleKeyUp);
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
        switch( event.key ) {
            case "Enter":
                if(this.checkPressedKeys("o") && this.checkPressedKeys("p") && this.checkPressedKeys("e") && this.checkPressedKeys("n")){
                    this.setState({hidden: !this.state.hidden});
                }
                break;
            default:
                break;
        }
    }
    //Called when a key is released
    _handleKeyUp = (event) => {
        this.keys.pop(event.key);
    }
    //Checks if specific key is pressed down
    checkPressedKeys(key){
        if(this.keys.some(item => key === item)){
            return true;
        }
        return false;
    }
    //Called when input is submitted
    handleInput(event){
        event.preventDefault();
        if(event.target.command.value === "352"){
            alert("New Email Received! Check your email!");
        }
    }

    render(){
        if(this.state.dataReceived && this.state.hidden) {
            return (
                <div class="standardDivList">
                    <h1 class="underline">Policy Documents</h1>
                  {
                    this.location.map((file) => {
                        return <div class="pdfItemDiv"><button class="pdfItem" onClick={() => this.getPDF(file)}>{file.split(".")[0]}</button></div>
                    })
                  }

                </div>
            )
        }
        else if(this.state.dataReceived) {
            return (
                <div class="standardDivList">
                    <h1 class="underline">Policy Documents</h1>
                  {
                    this.location.map((file) => {
                        return <div class="pdfItemDiv"><button class="pdfItem" onClick={() => this.getPDF(file)}>{file.split(".")[0]}</button></div>
                    })
                  }
                  <form onSubmit={this.handleInput}>
                    <label>Code: </label>
                    <input class="console" type="text" name="name" id="command"/>
                  </form>
                </div>
            )
        }
        else {
            return (<div>Loading...</div>)
        }

    }
}