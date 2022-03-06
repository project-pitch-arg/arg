import React, {Component} from 'react';
import './TabContent.css';
import {basicFetchDataJson} from "../Client/Client";


export default class Account extends Component{

    state = { dataReceived: false, popup: false}

    constructor(props){
        super(props);
        this.account = JSON.parse(localStorage.getItem("user"));
    }

    async getAccountData(json){
        var data = await basicFetchDataJson("/getUser", json);
        if(data.error){
            alert(data.error);
        }
        else {
            this.account = data;
            localStorage.setItem("user", JSON.stringify(data));
            this.popup();
        }
    }

    popup = () => {
        this.setState({popup:!this.state.popup});
    }
    logIn = (event) => {
        event.preventDefault();
        var json = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        this.getAccountData(json);
    }
    popupWindow = () => {
        return (<div className="popup-box">
                      <div className="box">
                        <h1>Account</h1>
                        <span className="close-icon" onClick={this.popup} >x</span>
                        <form onSubmit={this.logIn}>
                            <label>Username:</label>
                            <input type="text" id="username"/>
                            <label>Password:</label>
                            <input type="password" id="password"/>
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