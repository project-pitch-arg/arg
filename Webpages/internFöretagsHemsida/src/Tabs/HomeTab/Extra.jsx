import React, {Component} from 'react';
import '../TabContent.css';
import graph from '../../images/stock_graph.jpg';

export default class Quiz extends Component{
    render(){
        return (
                <div class="newsBlock">
                        <h1>Company Stock Price</h1>
                        <img class="graph" src={graph} alt=""/>
                        <h1>Quiz</h1>
                        <p>This week's quiz is about the history of our company, good luck!</p>
                        <form action="/wrong">
                            <input type="submit" value="Take Quiz" />
                        </form>

                </div>
            )
    }

}