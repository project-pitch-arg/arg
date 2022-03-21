import React, {Component} from 'react';
import {basicFetchData} from "../Client/Client"
import "./Quiz.css";


export default class Quiz extends Component{

    state = { dataReceived: false,quizDone: false}

    constructor(props){
        super(props);
        this.quiz = {};
    }

    async componentDidMount(){
        await this.getQuiz();
    }

    async getQuiz(){
        this.quiz = await basicFetchData("/getQuiz");
        this.setState({dataReceived: true});
    }
    quizDone = (event) => {
        event.preventDefault();
        if(event.target.answer0.value !== "" && event.target.answer1.value !== "" && event.target.answer2.value !== ""){
            this.setState({quizDone: true});
        }
        else {
            alert("Please answer all questions");
        }
    }
    render(){
        if(this.state.dataReceived){
            return (
                <div class="standardDivList">
                    {!this.state.quizDone ? (
                        <div><h1 class="underline">This week's quiz contest</h1>
                        <form class="questionForm" onSubmit={this.quizDone}>
                            {
                                Object.keys(this.quiz).map((key) => {
                                    return (<div class="quizObject">
                                        <h2>{this.quiz[key].text}</h2>
                                        {
                                            Object.entries(this.quiz[key].alternatives).map(([name,value], index) => {
                                                return (<div>
                                                  <input type="radio" id={name} name={"answer" + key} value={value}/>
                                                  <label htmlFor={name}>{value}</label>
                                                </div>)
                                            })
                                       }

                                </div>)
                            })
                            }
                        <input type="submit" value="Submit"/>
                        </form></div>) : (<div><h2>Thank you for participating! Winners will be disclosed before next week's quiz</h2></div>)}
                </div>
                )
        }
        else {
            return (<div>Loading...</div>)
        }
    }
}