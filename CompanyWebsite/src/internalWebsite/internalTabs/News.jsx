import React, {Component} from 'react';
import {basicFetchData} from "../client/Client";
import './TabContent.css';
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

    //Sorts the lists by date descending with newest first
    sortByDate(list){
        let check = true;
        while(check){
            check = false;
            try {
                for(let i = 0; i < list.length - 1; i++){
                    if(new Date(list[i].date).getTime() < new Date(list[i+1].date).getTime()){
                        check = true;
                        const temp = list[i];
                        list[i] = list[i+1];
                        list[i+1] = temp;
                    }
                }
            }
            catch (e){
                console.error(e)
            }

        }
    }

    //Requests news data from server
    async getNews(){
        this.news = await basicFetchData("/getNews");
        this.sortByDate(this.news);
        this.setState({dataReceived: true});
    }

    render(){
        if(this.state.dataReceived){
            return (
                <div className="newsBlock" style={{overflowY: 'scroll'}} >
                    <h1 className="newsHeader">News</h1>
                    {
                        Object.keys(this.news).map((key) => {
                            return (<List
                               className="list"
                               itemLayout="horizontal"
                               dataSource={key}
                               key={key}
                               renderItem={item => (
                                 <List.Item>
                                   <List.Item.Meta
                                     title={this.news[item].title + " - " + this.news[item].date}
                                     description={this.news[item].img ?
                                     (<div className="listItem"><img className="news" src={require("../images/" + this.news[item].img + ".jpg")} alt={"CEO" }/><p className="newsText">{this.news[item].text}</p></div>)
                                     :
                                     (<div className="listItem"><p className="newsText">{this.news[item].text}</p></div>)}
                                   />
                                 </List.Item>
                               )}
                             />)
                        })
                    }
                    <h2 style={{fontStyle: 'italic', color: "lightgray", opacity: "50%"}}>News older than 1 month is removed and stored in the archive!</h2>
                </div>
            )
        }
        else {
            return (<div className="newsBlock"/>)
        }

    }

}