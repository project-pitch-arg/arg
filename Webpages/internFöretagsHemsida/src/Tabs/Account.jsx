import React, {Component} from 'react';
import './TabContent.css';
import {basicFetchDataJson} from "../Client/Client";


export default class Account extends Component{

    state = { dataReceived: false}

    constructor(props){
        super(props);
        this.account = [];
    }

    async componentDidMount(){
        await this.getAccountData();
    }

    async getAccountData(){
        var json = {
            name: "Edmund Schmidt",
            password: "password123"
        }
        this.account = await basicFetchDataJson("/getUser", json);
        this.setState({dataReceived: true});
    }

    render(){
        if(this.state.dataReceived){
            return (
                <div class="standardDivList">
                    <h1>{this.account.name}</h1>
                    <img src={require('../images/'+ this.account.name +".jpg")} alt=""/>
                    <h2>PhoneNumber:{this.account.phoneNumber}</h2>
                    <h2>Email:{this.account.email}</h2>
                </div>
            )
        }
        else {
            return (<div>Loading...</div>)
        }
    }
}