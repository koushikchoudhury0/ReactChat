import React, { Component } from 'react'
import {SocketContext} from "../context/SocketContext"
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from './Input'
import Conversation from "./Conversation"
import {ConversationContext} from "../context/ConversationContext"
import Cookies from "js-cookie"
import ChatBoxImage from "../img/ChatBox.svg"
import "../css/ChatWindow.css"
import MongoDBLogo from "../img/mongodb.png"
import HerokuLogo from "../img/heroku.svg"
import NodeJsLogo from "../img/nodejs.png"
import SocketIOLogo from "../img/socketio.png"
import ReactLogo from "../img/react.svg"

class ChatWindow extends Component {

    state = { }

    renderByContext = (socketContext, conversationContext) => {
        //console.log("Render by Context: ", socketContext, conversationContext)
        //this.socketContext = socketContext
        switch(conversationContext.windowState){            
            case "loading":                                
                return (
                    <div className="container-fluid" style={{textAlign: "center", marginTop: "45vh"}}>
                        <CircularProgress /> 
                        <p>Loading Conversation</p>               
                    </div>
                )
            case "active":
                return (
                        <React.Fragment>                            
                            <Conversation />
                            <Input targetUid={conversationContext.currentFriend.uid}/>
                        </React.Fragment>
                )
            case "error":
                return ( 
                    <div className="container-fluid no-msg-container">                        
                        <p style={{opacity: "0.6"}}>Error while loading conversation</p>               
                    </div>
                )
            default:
                return ( 
                    <div className="container-fluid no-msg-container">
                        <img src={ChatBoxImage} height="128px" width="128px" />                        
                        <p style={{opacity: "0.6"}}>Select a chat to start conversation</p>               
                    </div>
                )
        }
    }

    render() { 
        return (
            <SocketContext.Consumer>{(socketContext) => (
                <ConversationContext.Consumer>{(conversationContext) => (
                    <div>
                        <div style={{height: "5%", width: "100%", overflow: "hidden"}}>
                            <p style={{textAlign: "center", fontFamily: "Montserrat", fontSize: "12px", color: "#bdbdbd"}}>
                                Built with Love using
                                <img src={ReactLogo} width="32px" height="32px"></img>
                                <img style={{marginLeft: "5px"}} src={NodeJsLogo} width="24px" height="24px"></img>
                                <img style={{marginLeft: "5px"}} src={MongoDBLogo} width="24px" height="24px"></img>
                                <img style={{marginLeft: "5px", marginRight: "10px"}} src={SocketIOLogo} width="22px" height="22px"></img>
                                On
                                <img style={{marginLeft: "5px"}} src={HerokuLogo} width="20px" height="20px"></img>
                            </p>
                        </div>
                        {this.renderByContext(socketContext, conversationContext)}
                    </div>
                )}</ConversationContext.Consumer>
            )}</SocketContext.Consumer>
        )        
    }

    componentDidMount() {
        //console.log("Component Did Mount: ", this.socketContext)
                
    }
}
 
export default ChatWindow;