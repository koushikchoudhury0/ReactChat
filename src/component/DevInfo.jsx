import React, { Component } from 'react';
import MongoDBLogo from "../img/mongodb.png"
import HerokuLogo from "../img/heroku.svg"
import NodeJsLogo from "../img/nodejs.png"
import SocketIOLogo from "../img/socketio.svg"

class DevInfo extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <h3 style={{fontFamily: "Oxygen", fontWeight: "bold"}}>ReactChat</h3>
                <div style={{padding: "20px", background: "#ad12730a", borderRadius: "5px", borderWidth: "2px", borderColor: "#a2959d", borderStyle: "solid", boxShadow: "#e0e0e0 1px 1px 10px"}}>
                    <h5 style={{fontFamily: "Quicksand"}}>Built Using</h5>
                    <p>
                        <img src={MongoDBLogo} width="48px" height="48px"></img>
                    </p>
                </div>                
                <img src={NodeJsLogo} width="64px" height="64px"></img>
            </React.Fragment>
        );
    }
}
 
export default DevInfo;