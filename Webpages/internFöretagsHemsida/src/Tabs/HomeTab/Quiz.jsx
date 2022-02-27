import React, {Component} from 'react';
import '../TabContent.css';


export default class Quiz extends Component{
    render(){
        return (
                <div class="newsBlock">
                        <h1>Quiz</h1>
                        <p>This week's quiz is about the history of our company, good luck!</p>
                        <form action="/wrong">
                            <input type="submit" value="Take Quiz" />
                        </form>
                </div>
            )
    }

}