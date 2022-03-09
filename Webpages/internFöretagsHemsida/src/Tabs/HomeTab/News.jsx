import React, {Component} from 'react';
import {basicFetchData} from "../../Client/Client";
import 'antd/dist/antd.css';
import '../TabContent.css';
import {List} from "antd";

export default class News extends Component{

    state = { dataReceived: false}

    constructor(props){
        super(props);
        this.news = [];
    }

    componentDidMount(){
        this.getNews.bind(this);
        this.getNews();
    }

    async getNews(){
        this.news = await basicFetchData("/getNews");
        this.setState({dataReceived: true});
    }

    render(){
        if(this.state.dataReceived){
            return (
                <div class="newsBlock" style={{overflowY: 'scroll'}}>
                    <h1>News</h1>
                    {
                        Object.keys(this.news).map((key) => {
                            return (<List
                               class="listItem"
                               itemLayout="horizontal"
                               dataSource={key}
                               renderItem={item => (
                                 <List.Item>
                                   <List.Item.Meta
                                     title={this.news[item].title + " - " + this.news[item].date}
                                     description={this.news[item].text}
                                   />
                                 </List.Item>
                               )}
                             />)
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