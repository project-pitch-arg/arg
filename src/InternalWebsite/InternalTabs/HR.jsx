import React, {Component} from 'react';
import './TabContent.css';
import {basicFetchData} from "../Client/Client"


export default class HR extends Component{

    state = { dataReceived: false,}

    constructor(props){
        super(props);
        this.hr = {};
    }

    async componentDidMount(){
        await this.getHR();
    }

    //Requests HR staff information from server.
    async getHR(){
        this.hr = await basicFetchData("/getHR");
        this.setState({dataReceived: true});
    }

    render(){
        if(this.state.dataReceived){
            return (
                <div class="newsBlock">
                    <h1 class="underline">HR Staff</h1>
                    <h2>Need to report an issue? Contact HR</h2>
                    <div>
                    {
                        Object.keys(this.hr).map((key) => {
                            return (<div class="hrObject" key={key}>
                                <h2 style={{color: "black"}}>{this.hr[key].name}</h2>
                                <img src={require('../images/' + this.hr[key].name + ".jpg")} alt={"Image of " + this.hr[key].name }/>
                                <h3>Email: {this.hr[key].email}</h3>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            )
        }
        else {
            return (<div>Loading...</div>)
        }
    }
}