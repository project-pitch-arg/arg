import React, {Component} from 'react';
import "./TabContent.css";
import {basicFetchData} from "../Client/Client";
import axios from 'axios';
import Variables from "../../json/Variables";
import {getCEOName, ip_address} from "../commonCode/CommonCode";


export default class Documents extends Component{

    state = { dataReceived: false, numberOfPages: 0, pageNumber: 1, fileName: null, hidden: true, unlockConsole: false, secret: false, ceo: false}

    constructor(props){
        super(props);
        this.policy = {};
        this.normalPDF = [];
        this.secretPDF = [];
        this.keys = [];
        this.clickedKeysFromText = [];
        this.input = "";
        this.correctKeys = Variables.keysPressedDownForConsole;
        this.ceoName = ""
        this.loadCEO();
        this.title = Array.from(Variables.titleForDocuments);
    }
    async loadCEO(){
        this.ceoName = await getCEOName();
    }
    //Adds eventListeners for key presses
    async componentDidMount(){
        await this.getPolicy();
        this.checkKey(localStorage.getItem("keyForFiles"));
        if(localStorage.getItem("smallConsole") === "true") this.setState({hidden: false});
        if(JSON.parse(localStorage.getItem("user")).username === this.ceoName){
            if(!this.state.ceo){
                this.setState({ceo: true, hidden: true});
            }
            await this.getSecret();
        }
        document.addEventListener("keydown", event => this._handleKeyDown(event, this.keys));
        const container = document.getElementById("container");
        container.addEventListener('click', this.clickHandler, false);
    }

    //Removes eventListeners for key presses
    componentWillUnmount(){
        document.removeEventListener("keydown", this._handleKeyDown);
    }

    componentDidUpdate(prevProps, prevState){
        this.reloadPage = this.props.reloadPage;
    }

    //Requests and displays specific pdf file from server
    async getPDF(fileName, path){
        const json = {
            "fileName": fileName
        };
        axios(ip_address + path, {
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
            this.normalPDF = await basicFetchData("/getPolicy");
            this.setState({dataReceived: true});
    }

    //Requests secret pdf file names from server
    async getSecret(){
            this.secretPDF = await basicFetchData("/getSecretDocuments");
            this.setState({dataReceived: true});
    }

    //Called when a key is pressed
    _handleKeyDown = (event, keyArray) => {
        if(event.key !== "Enter") keyArray.push(event.key);
        for(let i = 0; i < this.correctKeys.length; i++){
            if(!this.correctKeys.toUpperCase().includes(event.key.toUpperCase()) && event.key !== "Enter"){
                keyArray.length = 0;
            }
        }
        if(keyArray.length >= this.correctKeys.length && !this.state.ceo && event.key === "Enter"){
           this.setState({hidden: !this.state.hidden});
           localStorage.setItem("smallConsole", "true");
           keyArray.length = 0;
        }
    }

    //Called when input is submitted into "open" console
    handleInput = (event) => {
        event.preventDefault();
        if(event.target.command.value === Variables.smallConsoleCode){
            localStorage.setItem('Console', "true");
            this.reloadPage();
            window.history.replaceState(null, "New Page Title", "/Internal/Console");
            window.location.reload(false);
        }
        else {
            this.setState({wrongMessage: "Wrong code"});
            setTimeout(() => {
                this.setState({wrongMessage: ""});
            }, 3000);
        }
    }

    //Called when input is submitted into decrypt console
    handleInputDecrypt = (event) => {
        event.preventDefault();
        if(!this.checkKey(event.target.command.value)){
            this.setState({wrongMessage: "Wrong code"});
            setTimeout(() => {
                this.setState({wrongMessage: ""});
            }, 3000);
        }
    }

    clickHandler = (event) => {
        const key = {
            key: event.target.textContent
        };
        this._handleKeyDown(key,this.clickedKeysFromText);
        if(this.clickedKeysFromText.length === 4){
            key.key = "Enter";
            this._handleKeyDown(key, this.clickedKeysFromText);
        }
    }

    //Checks if the key entered is correct
    checkKey(value){
        if(value === Variables.smallDecryptConsole){
            this.setState({secret: true});
            localStorage.setItem("keyForFiles", value);
            return true;
        }
        return false;
    }

    //Called when lock is pressed
    unlock = () => {
        this.setState({unlockConsole: !this.state.unlockConsole});
    }

    render(){
        if(this.state.dataReceived) {
            return (
                <div className="newsBlock" >
                    <div className="marginDiv" id="container">{this.title.map((char) => {
                        return <span className="underline">{char}</span>
                    })}</div>
                  {
                    this.normalPDF.map((file) => {
                        return <div className="pdfItemDiv" key={file}><button className="pdfItem" onClick={() => this.getPDF(file, "/getPDF")}>{file.split(".")[0]}</button></div>
                    })
                  }
                  { this.state.ceo ?
                    (<div><div className="underlineDiv"/>
                        {!this.state.secret ? (<div className="lockedArchiveDiv"><h3 className="lockedArchive">Encrypted Archive</h3><img src={require("../images/Lock.png")} className="lock" alt="Lock" onClick={this.unlock}/>
                            {this.state.unlockConsole ? (<div><form onSubmit={this.handleInputDecrypt}>
                             <input className="smallConsole" placeholder="Enter key..." type="text" name="name" id="command"/>
                           </form> <p className="wrongMessage">{this.state.wrongMessage}</p></div>) : null}</div>)
                           :
                           (this.secretPDF.map((file) => {
                              return <div className="pdfItemDiv" key={file}><button className="pdfItem" onClick={() => this.getPDF(file, "/getSecretPDF")}>{file.split(".")[0]}</button></div>
                          }))
                        }</div>) : null
                  }
                  {!this.state.hidden ? (
                      <div className="centeredDiv"><form onSubmit={this.handleInput}>
                        <input className="smallConsole" placeholder="Enter code..." type="text" name="name" id="command"/>
                      </form><p className="wrongMessage">{this.state.wrongMessage}</p></div>) : null }
                </div>
            )
        }
        else {
            return (<div className="newsBlock"/>)
        }
    }
}