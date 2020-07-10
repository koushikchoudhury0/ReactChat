import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Chat from "./Chat"
import Cookies from "js-cookie"
//import NewChatDialog from './RequestDialog';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
//import io from "socket.io-client"
import CircularProgress from "@material-ui/core/CircularProgress"
import "../css/ChatList.css"
import {SocketContext} from "../context/SocketContext"
import {ConversationContext} from "../context/ConversationContext"

class ChatList extends Component {

    /* constructor(props){
        super(props)
        console.log("ChatList: ", props)
    } */

    static contextType = SocketContext

    state = { chats: undefined/* socket: undefined */ }

    shouldSelect = (chat) => {
        if (this.conversationContext.currentChatId === chat._id) return true
        else return false
    }

    renderChatList = (socketContext, conversationContext) => {
        this.conversationContext = conversationContext
        this.socketContext = socketContext
        if (this.state.chats === undefined || this.state.chats === null){
            return (<div style={{ marginTop: "50px", textAlign: "center" }}> <CircularProgress /> </div>)
        } else if (this.state.chats.length === 0) {
            return (<div style={{ marginTop: "50px", textAlign: "center" }}> <p style={{fontSize: "12px", color: "#757575"}}>You don't have any chats.<br></br>Add friends to chat with them.</p> </div>)
        } else {
            return (
                [].concat(this.state.chats)
                .sort((o1, o2) => o1.moment > o2.moment?-1:1)
                .map((chat, i)=>(
                    <Chat selected={this.shouldSelect(chat)} key={i} data={chat} />
                ))
            )
        }
    } 

    render() { 
        //console.log("Rendering ChatList")
        //console.log("Chats: ", this.props.chats)
        
        return (
            <SocketContext.Consumer>{(socketContext) => (
                <ConversationContext.Consumer>{(conversationContext) => (
                    <div className="customScroll" style={{height: "100%", overflowY: "scroll", paddingRight: "5px"}}>
                        {this.renderChatList(socketContext, conversationContext)}                
                    </div>
                )}</ConversationContext.Consumer>
            )}</SocketContext.Consumer>
        );
    }

    componentDidMount(){ 
        //this.setState({socket: this.props.socket}) 
        //console.log("From ChatList: ", this.context)
        
        this.socketContext.socket.emit("get-all-chats", {token: Cookies.get("token")}, (data) => {
            console.log("all-chats from server: ", data)                    
            if (data.statusCode === 1) this.setState({chats: data.chats})                        
        })

        this.socketContext.socket.on("new-chat", (data) => {
            console.log("Adding new chat to list: ", data)
            this.setState({chats: [data, ...this.state.chats]})
            //console.log("Present State: ", this.state)
        })

        this.socketContext.socket.on("chat-update", (data) => {
            console.log("Chat Update: ", data)
            let index = this.state.chats.findIndex(o => o._id === data.update._id)
            if (index === -1 ) return
            let chat = this.state.chats[index]
            chat.type = data.update.type
            chat.trueSender = data.update.trueSender
            chat.moment = data.update.moment
            chat.content = data.update.content
            chat.unread = data.update.unread
            //console.log("Target Chat: ", chat)
            this.setState({chats: this.state.chats})
        })
    } 
    
}
 
export default ChatList;