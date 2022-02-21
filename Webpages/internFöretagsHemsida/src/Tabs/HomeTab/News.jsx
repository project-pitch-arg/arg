import React, {Component} from 'react';
import '../TabContent.css';
import {basicFetchData} from "../../Client/BasicFetch";

export default class News extends Component{
    state = { dataReceived: false,}

    constructor(props){
        super(props);
        this.news = {};
    }
    async componentDidMount(){
        await this.getNews();
    }

    async getNews(){
            var data = await basicFetchData("/getNews");
            Object.keys(data[0]).forEach((key) => {
                this.news[data[0][key].title] = data[0][key].text;
            })
            this.setState({dataReceived: true});
    }

    render(){
        if(this.state.dataReceived){
            return (
                <div class="newsBlock">
                    <h1>News</h1>
                  {
                    Object.entries(this.news).map(([key,value]) => {
                        return (<div class="news">
                                <h2>{key}</h2>
                                <p>{value}</p>
                            </div>
                        )
                    })
                  }
                </div>
            )
        }
        else {
            return (<div>Loading...</div>)
        }

    }

}