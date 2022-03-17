import React, {Component} from 'react';
import './TabContent.css';
import {basicFetchDataJson} from "../Client/Client";

export default class Account extends Component{

    state = { dataReceived: false, popup: false}

    constructor(props){
        super(props);
        this.account = JSON.parse(localStorage.getItem("user"));
        this.cypher = "";
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
        if(event.target.cypher){
            var json = {"cypher": event.target.cypher.value};
            var response  = await basicFetchDataJson("/checkCypher", json);
            if(response.error){
                alert(response.error)
            }
            else {
                localStorage.setItem("user", JSON.stringify(response));
                this.popup();
            }
        }
        else if(event.target.username.value.toUpperCase() === "CEO" && localStorage.getItem("password") === event.target.password.value){
            this.activateCypher();
        }
        else {
            json = {
                username: event.target.username.value,
                password: event.target.password.value
            }
            this.getAccountData(json);
        }
    }

    activateCypher = async () => {
        var json = {"data": "placeholder"};
        var response  = await basicFetchDataJson("/getCypher", json);
        this.cypher = response.data;
        setTimeout(this.activateCypher, 60000);
        this.setState({dataReceived: true});
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
                    {this.cypher !== "" ? (<div><label>Cypher:</label><input type="text" id="cypher"/>
                    <p>Solve cypher to prove you are not a robot. You have 60 seconds.</p>
                    <p style={{color: "red"}}>{this.cypher}</p></div>) : (null) }
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