import React, {Component} from 'react';
import "./TabContent.css";
import {basicFetchData} from "../Client/Client";
import axios from 'axios';
import Variables from "../../json/Variables";
import {getCEOName} from "../CommonCode/CommonCode";


export default class Policy extends Component{

    state = { dataReceived: false, numberOfPages: 0, pageNumber: 1, fileName: null, hidden: true, unlockConsole: false, secret: false, ceo: false}

    constructor(props){
        super(props);
        this.policy = {};
        this.normalPDF = [];
        this.secretPDF = [];
        this.keys = [];
        this.input = "";
        this.correctKeys = Variables.keysPressedDownForConsole;
        this.ceoName = ""
        this.loadCEO();
    }
    async loadCEO(){
        this.ceoName = await getCEOName();
    }
    //Adds eventListeners for key presses
    async componentDidMount(){
        await this.getPolicy();
        this.checkKey(localStorage.getItem("keyForFiles"));
        if(JSON.parse(localStorage.getItem("user")).username === this.ceoName){
            if(!this.state.ceo){
                this.setState({ceo: true});
            }
            await this.getSecret();
        }
        document.addEventListener("keydown", this._handleKeyDown);
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
        var json = {
            "fileName" : fileName
        }
        axios(`http://95.80.24.200:3000/` + path, {
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
    _handleKeyDown = (event) => {
        if(event.key !== "Enter") this.keys.push(event.key);
        for(var i = 0; i < this.correctKeys.length; i++){
            if(!this.correctKeys.includes(event.key) && event.key !== "Enter"){
               this.keys = [];
            }
        }
        if(this.keys.length >= this.correctKeys.length && !this.state.ceo && event.key === "Enter"){
           this.setState({hidden: !this.state.hidden});
           this.keys = [];
        }
    }

    //Called when input is submitted into "open" console
    handleInput = (event) => {
        event.preventDefault();
        if(event.target.command.value === Variables.smallConsoleCode){
            localStorage.setItem('Console', true);
            this.reloadPage();
            window.history.replaceState(null, "New Page Title", "/Internal/Console");
            window.location.reload(false);
        }
    }

    //Called when input is submitted into decrypt console
    handleInputDecrypt = (event) => {
        event.preventDefault();
        this.checkKey(event.target.command.value);
    }

    //Checks if the key entered is correct
    checkKey(value){
        if(value === Variables.smallDecryptConsole){
            this.setState({secret: true});
            localStorage.setItem("keyForFiles", value);
        }
    }

    //Called when lock is pressed
    unlock = () => {
        this.setState({unlockConsole: !this.state.unlockConsole});
    }

    render(){
        if(this.state.dataReceived) {
            return (
                <div className="newsBlock" >
                    <h1 className="underline">Policy Documents</h1>
                  {
                    this.normalPDF.map((file) => {
                        return <div className="pdfItemDiv" key={file}><button className="pdfItem" onClick={() => this.getPDF(file, "getPDF")}>{file.split(".")[0]}</button></div>
                    })
                  }
                  { this.state.ceo ?
                    (<div><div className="underlineDiv"></div>
                        {!this.state.secret ? (<div className="lockedArchiveDiv"><h3 className="lockedArchive">Encrypted Archive</h3><img src={require("../images/Lock.png")} className="lock" alt="Lock" onClick={this.unlock}/>
                            {this.state.unlockConsole ? (<form onSubmit={this.handleInputDecrypt}>
                             <input className="smallConsole" placeholder="Enter key..." type="text" name="name" id="command"/>
                           </form> ) : (null)}</div>)
                           :
                           (this.secretPDF.map((file) => {
                              return <div className="pdfItemDiv" key={file}><button className="pdfItem" onClick={() => this.getPDF(file, "getSecretPDF")}>{file.split(".")[0]}</button></div>
                          }))
                        }</div>) : (null)
                  }
                  {!this.state.hidden ? (
                      <form onSubmit={this.handleInput}>
                        <input className="smallConsole" placeholder="Enter code..." type="text" name="name" id="command"/>
                      </form>) : (null)}
                </div>
            )
        }
        else {
            return (<div className="newsBlock"></div>)
        }
    }
}