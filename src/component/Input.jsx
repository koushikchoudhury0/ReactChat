import React, { Component } from 'react';
import Cookies from "js-cookie"
import SendIcon from "@material-ui/icons/SendRounded"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import "../css/Input.css"
import {SocketContext} from "../context/SocketContext"

class Input extends Component {

    static contextType = SocketContext
    /* constructor(props) {
        super(props)
        console.log("Input Props: ", props)
    } */

    state = { 
        visibility: 0 //0: nothing, 1: button, 2: progress 
    }

    sendMsg = () => {                        
        let text = this.textInput.value
        if (text.length === 0) return
        this.textInput.disabled = true   
        this.setState({visibility: 2})     
        this.context.socket.emit("send-msg", {token: Cookies.get("token"), targetUid: this.props.targetUid, content: text, type: "text"}, (data) => {
            this.setState({visibility: 0})
            this.textInput.disabled = false
            if (data.statusCode === 0){
                window.alert("Error Occured")
            } else {
                //this.props.onMsgSent(data.msg)
                document.getElementById("text").value = ''
                document.getElementById("text").focus()
            }
        })
    }

    renderSend = () => {
        switch(this.state.visibility){
            case 1:
                return (
                    <IconButton className="sendButton" onClick={()=>{this.sendMsg()}} aria-label="delete">
                        <SendIcon/>                        
                    </IconButton>
                )                
            case 2:
                return (
                    <CircularProgress className="progress" />
                )                
            default:
                return("")

        }
    }

    handleChange = (e) => {
        this.setState({visibility: this.textInput.value.length>0?1:0})
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {            
            this.textInput.value += "\n"            
            this.textInput.scrollTop = this.textInput.scrollHeight
            e.preventDefault();
        } else if (e.key === 'Enter') {
            this.sendMsg();
            e.preventDefault();
        }
    }

    render() { 
        return (
            <div style={{width: "100%", height: "10%", position: "absolute", bottom: "0", display: "table", background: "aliceblue"}}>
                <div style={{height:"2.5rem", background: "white", display: "table-cell", verticalAlign: "middle", borderRadius: "10px", borderStyle: "solid", borderColor: "#32708e96", position: "relative"}}>
                    <textarea 
                        ref={(o)=>{this.textInput = o}} 
                        onKeyDown={(e) => {this.handleKeyDown(e)}} 
                        onChange={(e) => {this.handleChange(e)}} 
                        id="text" 
                        placeholder="Write message here ..." 
                        maxLength={1000}>
                    </textarea>                                        
                    {this.renderSend()}                                        
                </div>                                
            </div>
        )
    }
}
 
export default Input;