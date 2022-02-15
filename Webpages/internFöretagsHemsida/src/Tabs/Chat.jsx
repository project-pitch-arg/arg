import React, {Component } from 'react';
import './Chat.css';
import {fetchData} from "../Client/client";

export default class Chat extends Component{

    state = { dataReceived: false, personChosen: null}

    constructor(props){
        super(props);
        this.conversations = [{}];
        this.largeChats = [{}];
        this.specificChat = [{}];
    }
    async componentDidMount(){
        await this.getConversations();
    }

    //Request conversations between the CEO and the staff from the server
    async getConversations(){
        var json = {
            text: "hello"
        }
        const response = await fetchData('/getConversations', json);
        const data = await response.json();
        Object.keys(data[0].chat).forEach((key) => {
            this.conversations.push(data[0].chat[key]);
        })
        Object.keys(data[0].messages).forEach((key) => {
            this.largeChats.push(data[0].messages);
        })
        this.setState({dataReceived: true});

    }
    addChat = () => async e =>{
        e.preventDefault();
        console.log("Added Chat");
    }

    //Populate lists related to conversations
    renderChatDiv(person){
        this.specificChat = [{}];
        var tempList = [{}];
        Object.keys(this.largeChats[1]).forEach((key) => {
            if(key === person){
                tempList.push(this.largeChats[1][key]);
            }
        })
        Object.keys(tempList[1]).forEach((key) => {
            this.specificChat.push(tempList[1][key]);
        })
        this.setState({personChosen: person});
    }
    //Populates the two different divs with the conversations/chosen conversation
    render(){
        if(this.state.dataReceived){
            return (
                    <div>
                        <div id="PersonDiv">
                            {this.conversations.map((conversation) => {
                                 if(conversation.time !== undefined){
                                    return(<div id="conversationBlock" onClick={() => this.renderChatDiv(conversation.person)}>
                                          <h1>{conversation.person}</h1>
                                          <p>{conversation.time}</p>
                                          <p>{conversation.lastMessage}</p>
                                     </div>
                                     )
                                 }
                                 else {
                                    return null;
                                 }
                             })}
                        </div>
                        <div id="ChatDiv">
                            {
                                this.specificChat.map((chat, index) => {
                                     if(chat.time !== undefined && chat.person === "CEO"){
                                        return(<div class="ceo">
                                            <div class="fillOut" ></div>
                                              <p>{chat.time}</p>
                                              <p class="border">{chat.message}</p>

                                         </div>
                                         )
                                     }
                                     else if(chat.time !== undefined){
                                        return(<div class="chat">
                                              <p>{chat.time}</p>
                                              <p class="border">{chat.message}</p>
                                              <div id="second" class="fillOut"></div>
                                         </div>)
                                     }
                                     else{
                                        return null;
                                     }
                                 })
                            }

                        </div>
                        {
                            this.state.personChosen !== null ?
                                (<div>
                                    <form onSubmit={this.addChat()}>
                                      <input class="chat" type="text" id="message" name="message"/>
                                    </form>
                                </div>) : (<div></div>)
                        }
                    </div>
                    )
        }
        else {
            return (<div>Loading...</div>)
        }
    }
}