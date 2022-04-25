import React, {Component} from 'react';
import './TabContent.css';
import graph from '../images/stock_graph.jpg';

export default class Extra extends Component{

    render(){
        return (
                <div class="newsBlock">
                    <h1>Company Financials</h1>
                    <h2>Company Stock Price</h2>
                    <img class="graph" src={graph} alt="" />
                    <h2>Q1 revenue Y/Y increase: +20%</h2>
                    <h2>Q1 net income Y/Y increase: +50%</h2>
                </div>
            )
    }

}