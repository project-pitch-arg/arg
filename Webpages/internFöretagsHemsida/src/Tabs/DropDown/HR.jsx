import React, {Component} from 'react';
import '../TabContent.css';
import {basicFetchData} from "../../Client/Client"


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
            this.hr = await basicFetchData("/getHR");
            this.setState({dataReceived: true});
    }
    render(){
        if(this.state.dataReceived){
            return (
                <div class="standardDivList">
                    <h1 class="underline">HR Staff</h1>
                    <div>
                        {
                            Object.keys(this.hr).map((key) => {
                                return (<div class="hrObject">
                                        <h2>{this.hr[key].name}</h2>
                                        <img src={require('../../images/' + this.hr[key].name + ".jpg")} alt={"Image of " + this.hr[key].name }/>
                                        <h3>Phone: {this.hr[key].phoneNumber}</h3>
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