import React, {Component} from 'react';
import '../TabContent.css';
import graph from '../DropDown/images/stock_graph.jpg';


export default class Graphs extends Component{
    render(){
        return (
                <div class="newsBlock">
                      <h1>Company Stock Price</h1>
                      <img class="graph" src={graph} alt=""/>
                </div>
            )
    }

}