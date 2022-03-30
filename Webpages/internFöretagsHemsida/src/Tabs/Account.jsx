import React, {Component} from 'react';
import './TabContent.css';

export default class Account extends Component{

    state = { dataReceived: false}

    constructor(props){
        super(props);
        this.account = JSON.parse(localStorage.getItem("user"));
    }

    render(){
        return (
            <div>
                <div class="newsBlock">
                    <h1>{this.account.username}</h1>
                    <img style={{width: "20vw"}}src={require('../images/'+ this.account.username +".jpg")} alt=""/>
                    <h2>PhoneNumber:{this.account.phoneNumber}</h2>
                    <h2>Email:{this.account.email}</h2>
                    <button class="switchAccount" onClick={this.props.logOut}>Sign out</button>
                </div>
            </div>
        )
    }
}