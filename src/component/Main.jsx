import URL from "../URL.js"
import React, { Component, useContext } from 'react'
import ChatList from './ChatList'
import io from "socket.io-client"
import Cookies from "js-cookie"
import UserDetails from './UserDetails'
import ChatIcon from "@material-ui/icons/ChatBubbleOutline"
import RequestIcon from "@material-ui/icons/ContactsOutlined"
import "../css/Main.css"
import RequestList from './RequestList'
//import { Fab } from '@material-ui/core'
//import AddIcon from "@material-ui/icons/Add"
//import RequestDialog from "./RequestDialog"
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from './Input'
import Conversation from "./Conversation"
//import Friend from './Friend';
import Badge from "@material-ui/core/Badge"
import {SocketContext} from "../context/SocketContext"
import ChatWindow from "./ChatWindow"
import DevInfo from "./DevInfo.jsx"


class Main extends Component {

    static contextType = SocketContext

    state = { selectedTab: "chat" }

    selectTab = (element, signal) => {
        if (signal === this.state.selectedTab) return        
        let elems = document.querySelectorAll(".tabButton");
        [].forEach.call(elems, (elem)=>{
            elem.classList.remove("tabSelected")
        })
        element.classList.add("tabSelected")        
        this.setState({selectedTab: signal})
    }
    
    render() {          
        return (
            this.context.socket===undefined?
            <div className="container-fluid progressContainer">
                <CircularProgress />                
            </div>
                :
            <div className="container mainContainer">
                <div className="container-fluid primaryContainer">                    
                    <div className="row primaryRow">
                        {/* <div className="col-lg-3">                            
                            <DevInfo />
                        </div> */}
                        <div className="col-lg-8 chatWindowContainer">                            
                            <ChatWindow />
                        </div>
                        <div className="col-lg-4" id="panel-window">
                            <div className="panelWindowContainer">                                
                                <div className="header">
                                    <UserDetails history={this.props.history} />                                    
                                    <div className="tabs">
                                        <button className="tabButton tabSelected" onClick={(e) => { this.selectTab(e.currentTarget, "chat") }}><span> <ChatIcon /> </span></button>
                                        <button className="tabButton" onClick={(e) => { this.selectTab(e.currentTarget, "friend-request") }}style={{marginLeft: "10px"}}><span> <Badge badgeContent={this.state.friendRequests===undefined?0:this.state.friendRequests.length} color="secondary"> <RequestIcon /> </Badge> </span></button>                                                                         
                                    </div>
                                </div>
                                <div className="listContainer">
                                    <div className={`listContainerPrimary ${this.state.selectedTab==="chat"?"shown":"hidden"}`}>
                                        <ChatList className="chatlist" current={this.state.currentFriend} chatClickCallback={this.onChatClick} history={this.props.history} socket={this.context.socket} chats={this.state.chats} handleIncomingChat={this.incomingChatCallback} />
                                    </div>
                                    <div className={`listContainerPrimary ${this.state.selectedTab==="friend-request"?"shown":"hidden"}`}>
                                        <RequestList />
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    
}
 
export default Main;