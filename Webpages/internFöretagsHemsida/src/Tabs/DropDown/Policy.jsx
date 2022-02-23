import React, {Component} from 'react';
import '../TabContent.css';
import {basicFetchData} from "../../Client/BasicFetch";
import axios from 'axios';


export default class Policy extends Component{

    state = { dataReceived: false,numberOfPages: 0, pageNumber: 1, fileName: null}

    constructor(props){
        super(props);
        this.policy = {};
        this.location = [];
    }
    async componentDidMount(){
        await this.getPolicy();
    }
    //Requests and displays specific pdf file from server
    async getPDF(fileName){
        var json = {
            "fileName" : fileName
        }
        axios(`http://localhost:8080/getPDF `, {
                method: "POST",
                responseType: "blob",
                data: json
                //Force to receive data in a Blob Format
              })
                .then(response => {
                  //Create a Blob from the PDF Stream
                  const file = new Blob([response.data], {
                    type: "application/pdf"
                  });
                  //Build a URL from the file
                  const fileURL = URL.createObjectURL(file);
                  //Open the URL on new Window
                  window.open(fileURL);
                })
                .catch(error => {
                  console.log(error);
                });
        this.setState({dataReceived: true});
    }
    //Requests pdf file names from server
    async getPolicy(){
            var data = await basicFetchData("/getPolicy");
            for (var i = 0; i < data.files.length; i++) {
                  this.location.push(data.files[i]);
            }
            this.setState({dataReceived: true});
    }

    render(){
        if(this.state.dataReceived) {
            return (
                    <div>
                        <h1>Document list</h1>
                      {
                        this.location.map((file) => {
                            return <button class="pdf" onClick={() => this.getPDF(file)}>{file.split(".")[0]}</button>
                        })
                      }
                    </div>
                )
        }
        else {
            return (<div>Loading...</div>)
        }

    }
}