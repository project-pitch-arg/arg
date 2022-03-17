import React, {Component} from 'react';
import '../TabContent.css';
import graph from '../../images/stock_graph.jpg';

export default class Extra extends Component{


    imageClick = () => {
        console.clear();
        console.log("/efwsefw");
    }

    render(){
        return (
                <div class="newsBlock">
                        <h1>Company Stock Price</h1>
                        <img class="graph" src={graph} alt="" onClick={this.imageClick}/>
                        <h1>Quiz</h1>
                        <p>This week's quiz is about the history of our company, good luck!</p>
                        <p style={{color: "lightgray"}}><i>Correct answers are 1,4,1</i></p>
                        <form action="/Quiz">
                            <input type="submit" value="Take Quiz" />
                        </form>
                </div>
            )
    }

}