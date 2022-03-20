import React, {Component} from 'react';
import {basicFetchDataJson} from "../../Client/Client";
import progressBar from "../../images/progress bar.jpg";
import {getAccountData} from "./LogIn";
import "../../Tabs/TabContent.css";
import 'antd/dist/antd.css';

export default class LogInPage extends Component{

    state = { dataReceived: false, popup: false}

    constructor(props){
        super(props);
        this.cipher = "";
        this.currentTimer = "";
        this.timerActivated = false;
    }

    logIn = async (event) => {
        event.preventDefault();
        if(event.target.cipher){
            var json = {"cipher": event.target.cipher.value};
            var response  = await basicFetchDataJson("/checkCipher", json);
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

    getTimeLeft() {
        return Math.round((this.currentTimer - new Date().getTime())/1000);
    }

    getTimeInPercentage(){
        return (100 - (this.currentTimer - new Date().getTime())/60000 * 100) + "%";
    }

    activateCipher = async () => {
        var json = {"data": "placeholder"};
        var response  = await basicFetchDataJson("/getCipher", json);
        this.cipher = await response.data;
        const delay = 60000;
        setTimeout(this.activateCipher, delay);
        this.currentTimer = new Date().getTime() + delay;
    }
    reloadPage = () => {
        setTimeout(this.reloadPage, 1000);
        this.setState({dataReceived: true});
    }

    render(){
        return (<div className="popup-box">
          <div className="box">
            <h1>Account</h1>
            <span className="close-icon" onClick={this.popup}>x</span>
            <form onSubmit={this.logIn}>
                <label>Username:</label>
                <input type="text" id="username"/>
                <label>Password:</label>
                <input type="password" id="password"/>
                {this.cipher !== "" ? (<div><label>cipher:</label><input type="text" id="cipher"/>
                <p>Solve security cipher to prove you are not a robot. You have {this.getTimeLeft()} seconds.</p>
                <p style={{color: "lightgray"}}><i>Hint: Answer should be an animal</i></p>
                <p style={{color: "red"}}>{this.cipher}</p><div class="progress-bar-div">
                <img class="progress-bar-image" src={progressBar} alt="Progress bar"/>
                <div class="progress-bar-removal" style={{width: this.getTimeInPercentage(this.currentTimer)}}></div>
                </div>
                </div>) : (null) }
                <input type="submit" id="submit" value="Log in"/>
            </form>
          </div>
        </div>)
    }
}