import React, {Component} from 'react';
import {basicFetchDataJson} from "../../Client/Client";
import progressBar from "../../images/progress bar.jpg";
import {getAccountData} from "./LogIn";
import "./LogInPage.css";

export default class LogInPage extends Component{

    state = { dataReceived: false, popup: false}

    constructor(props){
        super(props);
        this.cipher = "";
        this.currentTimer = "";
        this.timerActivated = false;
    }

    //Is called log in button is pressed
    logIn = async (event) => {
        event.preventDefault();
        if(event.target.cipher){
            var json = {"cipher": event.target.cipher.value};
            var response = await basicFetchDataJson("/checkCipher", json);
            if(response.error){
                alert(response.error)
            }
            else {
                localStorage.setItem("user", JSON.stringify(response));
                this.props.logIn();
            }
        }
        else if(event.target.username.value.toUpperCase() === "CEO" && localStorage.getItem("password") === event.target.password.value){
            if(!this.timerActivated){
                this.reloadPage();
                this.timerActivated = true;
                this.activateCipher();
            }
        }
        else {
            json = {
                username: event.target.username.value,
                password: event.target.password.value
            }
            if(await getAccountData(json)){
                this.props.logIn();
            }
        }
    }

    //Handles the time related to the CEO security cipher
    getTimeLeft() {
        return Math.round((this.currentTimer - new Date().getTime())/1000);
    }
    //Describes the time passed from the beginning in percentage for the cipher.
    getTimeInPercentage(){
        return (100 - (this.currentTimer - new Date().getTime())/60000 * 100) + "%";
    }

    //Client asks the server for the cipher and starts the clock
    activateCipher = async () => {
        var json = {"data": "placeholder"};
        var response  = await basicFetchDataJson("/getCipher", json);
        this.cipher = await response.data;
        const delay = 60000;
        setTimeout(this.activateCipher, delay);
        this.currentTimer = new Date().getTime() + delay;
    }

    //Simply reloads the page every second
    reloadPage = () => {
        setTimeout(this.reloadPage, 1000);
        this.setState({dataReceived: true});
    }

    render(){
        return (<div className="popup-box">
          <div className="box">
            <h1 className="logInHeader">Account</h1>
            <form className="logInForm" onSubmit={this.logIn}>
                <label>Username</label>
                <input type="text" id="username"/>
                <label>Password</label>
                <input type="password" id="password"/>
                {this.cipher !== "" ? (<div><label>Cipher</label><input type="text" id="cipher"/>
                <p>Solve security cipher to prove your identity. You have {this.getTimeLeft()} seconds.</p>
                <p style={{color: "white"}}><i>Hint: Answer should be an animal</i></p>
                <p style={{color: "red"}}>{this.cipher}</p><div className="progress-bar-div">
                <img className="progress-bar-image" src={progressBar} alt="Progress bar"/>
                <div className="progress-bar-removal" style={{width: this.getTimeInPercentage(this.currentTimer)}}></div>
                </div>
                </div>) : (null) }
                <input type="submit" id="submit" value="Log in"/>
            </form>
          </div>
        </div>)
    }
}