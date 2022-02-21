import React, {Component} from 'react';
import '../TabContent.css';
import {basicFetchData} from "../../Client/BasicFetch";


export default class HR extends Component{

    state = { dataReceived: false,}

    constructor(props){
        super(props);
        this.hr = {};
    }
    async componentDidMount(){
        await this.getNews();
    }

    async getNews(){
            var data = await basicFetchData("/getHR");
            Object.keys(data[0]).forEach((key) => {
                this.hr.key = data[0][key]
            })
            this.setState({dataReceived: true});
    }
    render(){
        if(this.state.dataReceived){
            return (
                <div class="hr">
                    <h1>HR Staff</h1>
                    <div>
                        {
                            Object.keys(this.hr).map((key) => {
                                return (<div class="hrObject">
                                        <h2>{this.hr.key.name}</h2>
                                        <img src="helena.png" />
                                        <h3>{this.hr.key.phoneNumber}</h3>
                                        <h3>{this.hr.key.email}</h3>
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