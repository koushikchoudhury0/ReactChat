import React, { Component } from 'react';
import Msg from './Msg';
import "../css/Conversation.css"
import DownIcon from "@material-ui/icons/KeyboardArrowDown"
import Fab from "@material-ui/core/Fab"
import Badge from "@material-ui/core/Badge"
import {ConversationContext} from "../context/ConversationContext"
import {SocketContext} from "../context/SocketContext"
import Cookies from "js-cookie"
import CommentImage from "../img/comment.svg"

class Conversation extends Component {

    /* constructor(props) {
        super(props)
        console.log("Conversation Props: ", props)
    } */

    /* static socketContext
    static conversationContext */

    state = { 
        scrolledUp: false,
        unread: 0
    }

    vars = {
        lastScrollTop: 0,
    }

    style = {
        container: { height: "82%", overflowY: "scroll", position: "absolute", bottom: "10%", width: "100%", marginBottom: "0", paddingLeft: "0" }
    }

    scrollToBottom = () => {
        //let elem = document.getElementById("list")
        if (this.fab.style.visibility === "visible"){
            //this.setState({unread: this.state.unread+1})
            return
        }
        this.listElement.scrollTop = this.listElement.scrollHeight
        //this.setState({unread: 0})
    }

    scrollToExpanded = (offset) => {
        console.log("Scrolling to: ", offset)
        document.getElementById("list").scrollTop = offset
    }

    handleScroll = () => {                
        var st = this.listElement.scrollTop;
        var sh = this.listElement.scrollHeight;
        var oh = this.listElement.offsetHeight;
        //console.log("ST: ", st, "SH: ", sh, "OH: ", oh, "sh-oh: ", sh-oh)
        if (st > this.vars.lastScrollTop){
            //console.log("Scolled Down")            
            if (/* this.state.scrolledUp === true */ this.fab.style.visibility === "visible" && st>(sh-oh-100/* -oh */)) {
                //this.setState({scrolledUp: false})
                this.fab.style.visibility="hidden"
            }
        } else {
            //console.log("Scolled Up")             
            if (/* this.state.scrolledUp === false */ this.fab.style.visibility === "hidden" && st<(sh-oh-100/* -oh */)) {
                //this.setState({scrolledUp: true})
                this.fab.style.visibility="visible"
            }
        }
        this.vars.lastScrollTop = st <= 0 ? 0 : st        
    }

    renderItems = () => {
        if (this.conversationContext.currentConversation.length===0){
            return (
                <div className="container-fluid placeholder" style={{marginTop: "25%", textAlign: "center"}}>
                    <img src={CommentImage} width="110px" height="110px" />
                    <h6>Either of you haven't started talking yet.<br/>Send a message now.</h6>
                    <p className="first">Press <span>Ctrl + Enter</span> for newline</p>
                    <p>Press <span>Enter</span> to send the message</p>
                </div>
            )
        } else {
            return (
                this.conversationContext.currentConversation.map((msg, i) => (                        
                    <Msg 
                    reduceMargin={
                        i===0?false:(this.conversationContext.currentConversation[i-1].senderUid===this.conversationContext.currentConversation[i].senderUid)                        
                    } 
                    onExpanded={this.scrollToExpanded} 
                    lastMoment={i==0?undefined:this.conversationContext.currentConversation[i-1].moment}
                    key={msg._id} 
                    msg={msg}/>
                ))
            )
        }
    }

    

    /* renderFab = ( )=> {
        if (this.state.scrolledUp){
            return (
                <Badge badgeContent={this.state.unread} color="secondary" style={{visibility: "hidden", position: "sticky", bottom: "3%", left: "82%"}}>
                    <Fab onClick={ ()=>{ this.setState({scrolledUp: false}); this.listElement.scrollTop = this.listElement.scrollHeight } } size="small" style={{background: "#039be5", fontSize: "14px", outline: "none", border: "none", marginLeft: "20px"}} > <DownIcon style={{color:"white"}} /> </Fab>
                </Badge>
            )
        } else {
            return ("")
        }
    } */

    renderByContext = (socketContext, conversationContext) => {
        this.socketContext = socketContext
        this.conversationContext = conversationContext
        return (
            <div ref={(o)=>{this.listElement = o}} onScroll={()=>{this.handleScroll()}} id="list" className="custom-scroll" style={this.style.container}>                
                {this.renderItems()}
                <Badge ref={(o)=>{this.fab=o}} badgeContent={this.state.unread} color="secondary" style={{position: "sticky", bottom: "5%", left: "86%", visibility: "hidden"}}>
                    <Fab onClick={ ()=>{ this.setState({unread: 0}); this.listElement.scrollTop = this.listElement.scrollHeight } } size="small" style={{background: "#039be5", fontSize: "14px", outline: "none", border: "none", marginLeft: "20px"}} > <DownIcon style={{color:"white"}} /> </Fab>
                </Badge>
            </div>
        )
    }

    render() {        
        return (
            <SocketContext.Consumer>{(socketContext) => (
                <ConversationContext.Consumer>{(conversationContext) => (
                    this.renderByContext(socketContext, conversationContext)
                )}</ConversationContext.Consumer>
            )}</SocketContext.Consumer>            
        )
    }

    componentDidMount() {
        //const {addNewMsg} = this.conversationContext        
        this.socketContext.socket.on("new-msg", (data) => {
            console.log("new msg: ", data)
            let msg = data.msg
            if (msg.senderUid === Cookies.get("uid")){
                //I'm the Sender
                console.log("I'm sender Comparing: ", this.conversationContext.currentFriend.uid, msg.receiverUid)
                if (this.conversationContext.currentFriend.uid === msg.receiverUid){
                    this.conversationContext.addNewMsg(msg)
                }
            } else {
                //I'm the receiver
                console.log("I'm receiver Comparing: ", this.conversationContext.currentFriend.uid, msg.senderUid, this.conversationContext.currentFriend.uid === msg.senderUid)            
                if (this.conversationContext.currentFriend.uid === msg.senderUid){
                    console.log("Firing...")
                    this.conversationContext.addNewMsg(msg)
                }
            }                        
        })     
        this.scrollToBottom()

    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    componentWillUnmount(){
        this.socketContext.socket.off("new-msg")
    }

    
}
 
export default Conversation;