import URL from "../URL.js"
import React, { Component } from 'react'
import ChatList from './ChatList'
import io from "socket.io-client"
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookies from "js-cookie"
import UserDetails from './UserDetails'
import ChatIcon from "@material-ui/icons/ChatBubbleOutline"
import RequestIcon from "@material-ui/icons/ContactsOutlined"
import "../css/Main.css"
import RequestList from './RequestList'
//import { Fab } from '@material-ui/core'
//import AddIcon from "@material-ui/icons/Add"
//import RequestDialog from "./RequestDialog"
import Input from './Input'
import Conversation from "./Conversation"
//import Friend from './Friend';


class Main extends Component {

    /* constructor(props){
        super(props)
        //console.log("Main: ", props)
    } */

    state = { 
        socket: undefined,
        chats: undefined,
        handleIncomingChat: undefined,
        selectedTab: 1,
        openRequestDialog: undefined,
        friendRequests: undefined,
        chatWindowState: 0, // 0: not yet initiated, 1: loading, 2: initiated,
        currentFriend: undefined,
        currentConversation: []
    }

    handler = (def) => {        
        this.openRequestDialog = def
    }

    selectTab = (element, code) => {
        if (code === this.state.selectedTab) return
        let elems = document.querySelectorAll(".tabButton");
        [].forEach.call(elems, (elem)=>{
            elem.classList.remove("selected")
        })
        element.classList.add("selected")        
        this.setState({selectedTab: code})
    }

    handleRequestRemoval = (reqId) => {
        console.log("Request: ", reqId, "will be removed from ", this.state.requests)
        let remRequests = this.state.friendRequests.filter(o => o.id !== reqId)
        console.log(remRequests)
        this.setState({friendRequests: remRequests})
    }

    renderChatWindow = () => {
        switch(this.state.chatWindowState){            
            case 1:
                return (
                    <div className="container-fluid" style={{textAlign: "center", marginTop: "45vh"}}>
                        <CircularProgress /> 
                        <p>Loading Conversation</p>               
                    </div>
                )
            case 2:
                return (
                        <React.Fragment>
                            {/* <Friend friend={this.state.currentFriend} /> */}
                            <Conversation ref={(obj)=>{this.convoObj = obj}} conversation={this.state.currentConversation}/>
                            <Input socket={this.state.socket} onMsgSent={this.onMsgSent} to={this.state.currentFriend.id}/>
                        </React.Fragment>
                )
            default:
                return ( 
                    <div className="container-fluid" style={{textAlign: "center", marginTop: "45vh"}}>                        
                        <p style={{opacity: "0.6"}}>Select a chat to start conversation</p>               
                    </div>
                )
        }
    }

    onMsgSent = (msg) => {
        //console.log("Appendable msg: ", msg)
    }

    onChatClick = (uid, name) => {
        this.setState({chatWindowState: 1})
        console.log(`Loading Coversation of You & ${name}`)
        this.state.socket.emit("load-conversation", {uid: Cookies.get("id"), targetUid: uid}, (data) => {
            if (data.statusCode === 0){
                this.setState({chatWindowState: 1})
                window.alert("Error Occured")
            } else {
                console.log("Conversation: ", data.conversation)
                let chats = this.state.chats
                let index = chats.findIndex(o => o.uid === parseInt(uid))
                chats[index].unread = 0
                this.setState({chats: chats, chatWindowState: 2, currentFriend: {id: uid, name: name}, currentConversation: data.conversation})                                
                this.convoObj.scrollToBottom()
            }
        })
    }
    
    render() {   
        //console.log("Rendering Main.jsx...")                  
        return (
            this.state.socket===undefined?
            <div className="container-fluid" style={{textAlign: "center", marginTop: "45vh"}}>
                <CircularProgress />                
            </div>
                :
            <div className="container">
                <div className="container-fluid" style={{padding: "50px", height: "100vh"}}>                    
                    <div className="row" style={{height: "100%"}}>
                        <div className="col-lg-8" style={{padding: "0", height: "100%", position: "relative"}}>
                            {this.renderChatWindow()}
                        </div>
                        <div className="col-lg-4" id="panel-window" style={{background: "#fff", height: "100%", maxHeight: "100%", overflowY: "hidden", padding: "0"}}>
                            <div style={{padding: "0px 10px", height: "100%"}}>                                
                                <div style={{height: "24%", background: "#ffffff", paddingBottom: "5px"}}>
                                    <UserDetails history={this.props.history} socket={this.state.socket} />                                    
                                    <div style={{marginTop: "10px", marginBottom: "10px"}}>
                                        <button className="tabButton selected" onClick={(e) => { this.selectTab(e.currentTarget, 1) }}><span> <ChatIcon /> </span></button>
                                        <button className="tabButton" onClick={(e) => { this.selectTab(e.currentTarget, 2) }}style={{marginLeft: "10px"}}><span> <RequestIcon /> </span></button>
                                        {/* {this.state.selectedTab === 2?
                                            <React.Fragment>
                                                <Fab onClick={ ()=>{ this.foo.openDialog() } } variant="extended" size="small" color="secondary" style={{fontSize: "10px", outline: "none", border: "none", marginLeft: "20px"}} > <AddIcon /></Fab>                                                                                            
                                            </React.Fragment>
                                            :
                                            ""} */}                                    
                                    </div>
                                </div>
                                <div style={{overflowY: "hidden", height: "76%", marginTop: "0px"}}>
                                    {this.state.selectedTab === 1?
                                        <ChatList current={this.state.currentFriend} chatClickCallback={this.onChatClick} history={this.props.history} socket={this.state.socket} chats={this.state.chats} handleIncomingChat={this.incomingChatCallback} />
                                        :
                                        this.state.selectedTab === 2?
                                            <RequestList requestRemovalCallback={this.handleRequestRemoval} socket={this.state.socket} data={this.state.friendRequests} />
                                            :
                                            ""}                                
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){                
        //console.log("Connecting to sockets")
        //let socket = io("http://52.66.243.216:3001")
        let socket = io(`${URL}`)
        //console.log("Connected to Socket")
        this.setState({socket: socket})
        
        socket.on("start-establish", () => {
            socket.emit("establish", {uid: Cookies.get("id")}, (data) => {
                //console.log("Estd: ", data)
                socket.emit("get-all-chats", {uid: Cookies.get("id")}, (chats) => {
                    //console.log("all-chats from server: ", chats)                    
                    this.setState({chats: chats})
                })
                socket.emit("get-all-friend-requests", {uid: Cookies.get("id")}, (requests) => {
                    console.log(requests)
                    this.setState({friendRequests: requests})
                }) 
            })
        })

        socket.on("force-disconnect", () => {
            Cookies.remove("token")
            Cookies.remove("username")        
            this.props.history.push(`/`)
            socket.disconnect()
        })
        
        socket.on("incoming-chat", (chat) => {
            console.log(chat)
            this.state.handleIncomingChat(chat)
        })
        
        socket.on("new-friend-request", (data) => {
            this.setState({friendRequests: [...this.state.friendRequests, data]})
        })  
        
        socket.on("new-chat", (data) => {
            console.log("Adding new chat to list: ", data)
            this.setState({chats: [...this.state.chats, data]})
            console.log("Present State: ", this.state)
        })
        
        socket.on("new-msg", (data)=>{
            let msg = data.msg
            console.log("New msg: ", msg)            
            if (parseInt(msg.to) === parseInt(Cookies.get("id"))){
                console.log("Received. Finding Chat with UID: ", msg.sender)
                //msg was sent to me
                let chats = this.state.chats
                console.log(chats)
                let index = chats.findIndex(o => o.uid === parseInt(msg.sender))
                if (index === -1) return
                chats[index].lastMsg = msg.content
                chats[index].moment = msg.moment
                chats[index].sender = 0                
                if (this.state.currentFriend !== undefined) {
                    if (parseInt(msg.sender) === this.state.currentFriend.id){
                        //msg is for ongoing convo
                        this.setState({currentConversation: [...this.state.currentConversation, {content: msg.content, msgId: msg.id, sender: msg.sender}]})
                        this.convoObj.scrollToBottom()
                        socket.emit("read-chat", {uid: Cookies.get("id"), src: msg.sender})
                    } else {
                        //msg is for any other convo
                        chats[index].unread = chats[index].unread+1
                    }
                } else chats[index].unread = chats[index].unread+1
                this.setState({chats: chats})
            } else {
                console.log("Sent. Finding Chat with UID: ", msg.to)
                //i sent the msg
                let chats = this.state.chats
                console.log(chats)
                let index = chats.findIndex(o => o.uid === parseInt(msg.to))
                if (index === -1) return
                console.log("Index: ", index)
                chats[index].lastMsg = msg.content
                chats[index].moment = msg.moment
                chats[index].sender = 1

                if (this.state.currentFriend !== undefined) {
                    if (parseInt(msg.to) === this.state.currentFriend.id){
                        this.setState({currentConversation: [...this.state.currentConversation, {content: msg.content, msgId: msg.id, sender: Cookies.get("id")}]})
                        this.convoObj.scrollToBottom()
                    }
                }

                this.setState({chats: chats})
            }            

        })

        this.setState({openRequestDialog: this.openRequestDialog})      
    }
}
 
export default Main;