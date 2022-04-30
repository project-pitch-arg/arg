import React, {Component} from 'react';
import {basicFetchData} from "../Client/Client"
import "./Quiz.css";
export default class Quiz extends Component{

    state = { dataReceived: false,quizComplete: false}

    constructor(props){
        super(props);
        this.quiz = {};
    }

    async componentDidMount(){
        await this.getQuiz();
    }

    //Requests quiz data from server.
    async getQuiz(){
        this.quiz = await basicFetchData("/getQuiz");
        this.setState({dataReceived: true});
    }

    //Checks if all questions have a selected answer. If not the user is alerted to finish it.
    quizDone = (event) => {
        event.preventDefault();
        var check = true;
        for(var i = 0; i < this.quiz.length; i++){
            if(event.target["answer" + i].value === ""){
                alert("Please answer all questions");
                check = false;
                break;
            }
        }
        if(check)
            this.setState({quizComplete: true});
    }

    render(){
        if(this.state.dataReceived){
            return (
                <div class="newsBlock">
                    {!this.state.quizComplete ? (
                        <div><h1 class="underline">This week's quiz contest</h1>
                        <p style={{color: "#24647f"}}>Correct Answers are 2,3,1</p>
                        <form class="questionForm" onSubmit={this.quizDone}>
                        {
                            Object.keys(this.quiz).map((key) => {
                                return (<div class="quizObject" key={key}>
                                    <h2 style={{color: "black", marginBottom: "10px", marginTop: "0"}}>{this.quiz[key].text}</h2>
                                    {
                                        Object.entries(this.quiz[key].alternatives).map(([name,value], index) => {
                                            return (<div key={value}>
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
            return (<div class="newsBlock"></div>)
        }
    }
}