import React, {Component} from 'react';
import './TabContent.css';
import {nameFormatting} from "../CommonCode/CommonCode";

export default class Account extends Component{

    state = { dataReceived: false}

    constructor(props){
        super(props);
        this.account = JSON.parse(localStorage.getItem("user"));
    }

    render(){
        return (
            <div className="newsBlock" >
                <h1>{nameFormatting(this.account.username)}</h1>
                <img style={{width: "30vh"}} src={require('../images/'+ this.account.username +".jpg")} alt=""/>
                <button className="switchAccount" onClick={this.props.logOut}>Sign out</button>
            </div>
        )
    }
}