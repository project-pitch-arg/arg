import React, {Component} from 'react';
import '../TabContent.css';
import {fetchData} from "../../Client/client";

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
            var json = {
                text: "hello"
            }
            const response = await fetchData('/getNews', json);
            const data = await response.json();
            Object.keys(data[0]).forEach((key) => {
                this.news[data[0][key].title] = data[0][key].text;
            })
            console.log(this.news);
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