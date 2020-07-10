import React, { Component, createContext } from 'react'
import sio from "socket.io-client"
import URL from "../URL.js"
import Cookies from "js-cookie"
import {SocketContext} from "./SocketContext"

export class ConversationProvider extends Component {
    
    static contextType = SocketContext

    state = { 
        windowState: "none",
        currentFriend: undefined,
        currentChatId: undefined,
        currentConversation: []
    }

    invokeConversation = (uid, name, chatId) => {
        this.setState({
            currentFriend: {uid: uid, name: name},            
            windowState: "loading"
        })
        this.context.socket.emit("load-conversation", {token: Cookies.get("token"), targetUid: uid}, (data) => {
            if (data.statusCode === 1){
                this.setState({windowState: "active", currentConversation: data.conversation, currentChatId: chatId})
            } else {
                this.setState({windowState: "error", currentChatId: chatId})
            }
        })
    }

    addNewMsg = (msg) => {
        console.log("Adding new msg")
        this.setState({currentConversation: [...this.state.currentConversation, msg]})
    }
    
    render() { 
        return (
            <ConversationContext.Provider value={{...this.state, invokeConversation: this.invokeConversation, addNewMsg: this.addNewMsg}}>
                {this.props.children}
            </ConversationContext.Provider>
        );
    }

}
 
export const ConversationContext = createContext();
