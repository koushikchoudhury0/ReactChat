import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Chat from "./Chat"
import Cookies from "js-cookie"
//import NewChatDialog from './RequestDialog';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
//import io from "socket.io-client"
import CircularProgress from "@material-ui/core/CircularProgress"
import "../css/ChatList.css"

class ChatList extends Component {

    /* constructor(props){
        super(props)
        console.log("ChatList: ", props)
    } */

    state = { socket: undefined }

    logout(){    
        Cookies.remove("token")
        Cookies.remove("username")        
        this.props.history.push(`/`)
        this.state.socket.disconnect()
    }

    shouldSelect = (chat) => {
        if (this.props.current !== undefined && this.props.current.id === chat.uid) return true
        else return false
    }

    renderChatList = () => {
        if (this.props.chats === undefined || this.props.chats === null){
            return (<div style={{ marginTop: "50px", textAlign: "center" }}> <CircularProgress /> </div>)
        } else if (this.props.chats.length === 0) {
            return (<div style={{ marginTop: "50px", textAlign: "center" }}> <p style={{fontSize: "12px", color: "#757575"}}>You don't have any chats.<br></br>Add friends to chat with them.</p> </div>)
        } else {
            return (
                this.props.chats.map((chat, i)=>(
                    <Chat selected={this.shouldSelect(chat)} onChatClick={this.props.chatClickCallback} key={i} data={chat} />
                ))
            )
        }
    } 

    render() { 
        //console.log("Rendering ChatList")
        //console.log("Chats: ", this.props.chats)
        
        return (
            <div className="customScroll" style={{height: "100%", overflowY: "scroll", paddingRight: "5px"}}>
                {this.renderChatList()}                
            </div>
        );
    }

    componentDidMount(){ this.setState({socket: this.props.socket}) } 
    
}
 
export default ChatList;