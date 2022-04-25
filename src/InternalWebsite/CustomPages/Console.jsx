import React, {Component} from 'react';
import './Console.css';
import Variables from "../../json/Variables.json";

export default class Console extends Component{

    state = { dataReceived: false, }

    constructor(props){
        super(props);
        this.previousCommands = [""];
        this.helpCommands = Variables.helpCommands;
        this.adminCommands = Variables.adminCommands;
        this.securityAnswers = [
            Variables.firstSecurityAnswer, Variables.secondSecurityAnswer, Variables.thirdSecurityAnswer
        ]
        this.adminCode = Variables.adminCode;
        this.adminOn = false;
        this.securityCheck = false;
        this.messagesEnd = React.createRef();
    }

    //Controls the scroll for the command prompt so that it always scrolls down to the newest command response
    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    scrollToBottom = () => {
      this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    //Called when input is submitted
    handleInput = (event) =>{
        event.preventDefault();

        var command = event.target.command.value.split(/\s+/)[0];
        var data = event.target.command.value.split(/\s+/)[1];
        var answers = event.target.command.value.split(/\s+/);
        answers.splice(0,1);
        answers.splice(0,1);

        switch (command){
            case "/help":
                this.previousCommands.push("The commands available are:");
                if(this.adminOn){
                    this.adminCommands.forEach((command) => {
                        this.previousCommands.push(command);
                    })
                }
                else {
                    this.helpCommands.forEach((command) => {
                        this.previousCommands.push(command);
                    })
                }
                break;
            case "/clear":
                    this.previousCommands = [];
                    break;
            case "/admin":
                    if(data === this.adminCode){
                        this.previousCommands.push("Admin commands activated!");
                        this.adminOn = true;
                    }
                    else {
                        this.previousCommands.push("Invalid code!");
                    }
                break;
            case "/currentAdmin":
                    if(this.adminOn){
                        this.previousCommands.push("Current Admin: CEO");
                    }
                    else {
                        this.defaultMessage(command);
                    }
                break;
            case "/changePassword":
                    if(this.adminOn && data === "CEO"){
                        if(answers.length === 3){
                            var check = true;
                            for(var i = 0; i < answers.length; i++){
                                if(answers[i].toUpperCase() !== this.securityAnswers[i].toUpperCase()){
                                    this.previousCommands.push("Wrong answers");
                                    check = false;
                                    break;
                                }
                            }
                            if(check){
                                this.previousCommands.push("Security questions completed, you can now use /changePassword CEO [newpassword]");
                                this.securityCheck = true;
                            }
                            break;
                        }
                        else if(this.securityCheck && answers.length === 1){
                            this.previousCommands.push("CEO password changed");
                            localStorage.setItem("password", answers[0]);
                            break;
                        }
                        else {
                            this.previousCommands.push("Security Questions: ");
                            this.previousCommands.push(Variables.firstSecurityQuestion);
                            this.previousCommands.push(Variables.secondSecurityQuestion);
                            this.previousCommands.push(Variables.thirdSecurityQuestion);
                            this.previousCommands.push("Answer question in format /changePassword [user] [answer 1] [answer2] [answer3]");
                        }
                    }
                    else if(this.adminOn){
                        this.previousCommands.push( data + " was not found in database!");
                    }
                    else {
                        this.defaultMessage(command);
                    }
                break;
            default:
                this.defaultMessage(command);
                break;
        }
        this.setState({dataReceived: true});
        event.target.reset();
    }

    defaultMessage(message){
        this.previousCommands.push("The command " + message + " does not exist!");
    }

    render(){
        return (
            <div>
              <form onSubmit={this.handleInput}>
                <div class="commandBlock">{
                    this.previousCommands.map((command) => {
                        return (<p>{command + "\n"}</p>)
                    })}
                    <div style= {{float: "left", clear:"both"}}
                        ref={this.messagesEnd}>
                    </div>
               </div>
                <input class="console" type="text" name="name" id="command" autoFocus/>
              </form>
            </div>
        )
    }
}