import React, {Component} from 'react';
import "./TabContent.css";
import {basicFetchData} from "../Client/Client";
import axios from 'axios';
import Variables from "../../json/Variables";


export default class Policy extends Component{

    state = { dataReceived: false, numberOfPages: 0, pageNumber: 1, fileName: null, hidden: true, unlockConsole: false, secret: false, ceo: false}

    constructor(props){
        super(props);
        this.policy = {};
        this.normalPDF = [];
        this.secretPDF = [];
        this.keys = [];
        this.input = "";
    }

    //Adds eventListeners for key presses
    async componentDidMount(){
        await this.getPolicy();
        this.checkKey(localStorage.getItem("keyForFiles"));
        if(JSON.parse(localStorage.getItem("user")).username === "CEO"){
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
        axios(`http://localhost:8080/` + path, {
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
        this.keys.push(event.key);
        if(event.key !== "o" && event.key !== "p" && event.key !== "e" && event.key !== "n" && event.key !== "Enter" ){
            this.keys = [];
        }
        switch( event.key ) {
            case "Enter":
                if(this.checkPressedKeys("o") && this.checkPressedKeys("p") && this.checkPressedKeys("e") && this.checkPressedKeys("n") && !this.state.ceo){
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
                <div class="newsBlock">
                    <h1 class="underline">Policy Documents</h1>
                  {
                    this.normalPDF.map((file) => {
                        return <div class="pdfItemDiv" key={file}><button class="pdfItem" onClick={() => this.getPDF(file, "getPDF")}>{file.split(".")[0]}</button></div>
                    })
                  }
                  { this.state.ceo ?
                    (<div><div class="underlineDiv"></div>
                        {!this.state.secret ? (<div class="lockedArchiveDiv"><h3 class="lockedArchive">Encrypted Archive</h3><img src={require("../images/Lock.png")} class="lock" alt="Lock" onClick={this.unlock}/>
                            {this.state.unlockConsole ? (<form onSubmit={this.handleInputDecrypt}>
                             <input class="smallConsole" placeholder="Enter key..." type="text" name="name" id="command"/>
                           </form> ) : (null)}</div>)
                           :
                           (this.secretPDF.map((file) => {
                              return <div class="pdfItemDiv" key={file}><button class="pdfItem" onClick={() => this.getPDF(file, "getSecretPDF")}>{file.split(".")[0]}</button></div>
                          }))
                        }</div>) : (null)
                  }
                  {!this.state.hidden ? (
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