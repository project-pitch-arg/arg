import React, {Component} from 'react';
import './TabContent.css';
import News from './HomeTab/News';
import Extra from './HomeTab/Extra';

export default class Home extends Component{
    render(){
        return (
                <div class="homeDiv" style={{ overflowY: 'scroll'}}>
                    <News/>
                    <Extra/>
                </div>
            )
    }

}