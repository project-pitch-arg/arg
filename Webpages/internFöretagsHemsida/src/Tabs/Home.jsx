import React, {Component} from 'react';
import './TabContent.css';
import News from './HomeTab/News';
import Graphs from './HomeTab/Graphs';
import Quiz from './HomeTab/Quiz';

export default class Home extends Component{
    render(){
        return (
                <div class="home">
                        <News/>
                        <Graphs/>
                        <Quiz/>
                </div>
            )
    }

}