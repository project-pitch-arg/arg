import React, {Component} from 'react';
import './TabContent.css';


export default class Account extends Component{
    render(){
        return (
                <div class="home">
                    <h1>Name</h1>
                    <img src="person" />
                    <h2>PhoneNumber:</h2>
                    <h2>Email:</h2>
                    <button>Apply changes</button>

                </div>
            )
    }

}