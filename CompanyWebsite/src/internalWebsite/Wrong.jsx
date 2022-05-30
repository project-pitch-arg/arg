import React, {Component} from 'react';
import './internalTabs/TabContent.css';

export default class InternalWrong extends Component{
    render(){
        return (
                <div className="newsBlock" id="InternalWrongtag">
                  <h2 style={{color: "red"}}>ERROR 352 , The page you requested could not be found.</h2>
                </div>
            )
    }
}