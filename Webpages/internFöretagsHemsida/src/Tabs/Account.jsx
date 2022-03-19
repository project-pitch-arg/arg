import React, {Component} from 'react';
import './TabContent.css';
import {basicFetchDataJson} from "../Client/Client";
import progressBar from "../images/progress bar.jpg";

export default class Account extends Component{

    state = { dataReceived: false, popup: false}

    constructor(props){
        super(props);
        this.account = JSON.parse(localStorage.getItem("user"));
        this.cipher = "";
        this.currentTimer = "";
        this.timerActivated = false;
    }

    async getAccountData(json){
        var data = await basicFetchDataJson("/getUser", json);
        if(data.error){
            alert(data.error);
        }
        else {
            this.account = data;
            if(data.username === "CEO"){
                json = {"token" : JSON.parse(localStorage.getItem("user")).token};
                var response  = await basicFetchDataJson("/checkToken", json);
                if(response.token === true){
                    localStorage.setItem("user", JSON.stringify(data));
                }
                else {
                    alert("Nice try");
                }

            }
            this.popup();
            this.setState({dataReceived: true});
        }
    }

    popup = () => {
        this.setState({popup:!this.state.popup});
    }

    logIn = async (event) => {
        event.preventDefault();
        console.log("Yes");
        if(event.target.cipher){
            var json = {"cipher": event.target.cipher.value};
            var response  = await basicFetchDataJson("/checkCipher", json);
            if(response.error){
                alert(response.error)
            }
            else {
                localStorage.setItem("user", JSON.stringify(response));
                this.popup();
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
            this.getAccountData(json);
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

    popupWindow = () => {
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

    render(){
        return (
            <div>
                {this.state.popup ? (this.popupWindow()) : (null)}
                <div class="standardDivList">
                    <h1>{this.account.username}</h1>
                    <img src={require('../images/'+ this.account.username +".jpg")} alt=""/>
                    <h2>PhoneNumber:{this.account.phoneNumber}</h2>
                    <h2>Email:{this.account.email}</h2>
                    <button class="switchAccount" onClick={this.popup}>SwitchAccount</button>
                </div>

            </div>
        )
    }
}