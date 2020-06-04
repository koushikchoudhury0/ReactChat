import React, { Component } from 'react';
import Cookies from "js-cookie"
import SendIcon from "@material-ui/icons/SendRounded"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import "../css/Input.css"

class Input extends Component {
    state = { 
        visibility: 0 //0: nothing, 1: button, 2: progress 
    }

    sendMsg = () => {                        
        let text = this.textInput.value
        if (text.length === 0) return
        this.textInput.disabled = true   
        this.setState({visibility: 2})     
        this.props.socket.emit("send-msg", {uid: Cookies.get("id"), to: this.props.to, content: text}, (data) => {
            this.setState({visibility: 0})
            this.textInput.disabled = false
            if (data.statusCode === 0){
                window.alert("Error Occured")
            } else {
                this.props.onMsgSent(data.msg)
                document.getElementById("text").value = ''
                document.getElementById("text").focus()
            }
        })
    }

    renderSend = () => {
        switch(this.state.visibility){
            case 1:
                return (
                    <IconButton onClick={()=>{this.sendMsg()}} style={{position: "absolute", top: "0", right: "2px", width: "5%", height: "100%", border: "none", outline: "none"}} aria-label="delete">
                        <SendIcon style={{transform: "translateY(-6px)"}} />                        
                    </IconButton>
                )                
            case 2:
                return (
                    <CircularProgress style={{height: "1rem", width: "1rem", position: "absolute", top: "9px", right: "10px"}} />
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
            <div style={{padding: "10px 10px", width: "100%", height: "10%", position: "absolute", bottom: "0", display: "table"}}>
                <div style={{height:"2.5rem", background: "white", display: "table-cell", verticalAlign: "middle", borderRadius: "50px", borderStyle: "solid", borderColor: "#32708e96", position: "relative"}}>
                    <textarea ref={(o)=>{this.textInput = o}} onKeyDown={(e) => {this.handleKeyDown(e)}} onChange={(e) => {this.handleChange(e)}} id="text" placeholder="Write a message" style={{overflow: "hidden", resize: "none", position: "absolute", left: "0", top: "0", width: "90%", outline: "none", border: "none", marginLeft: "3%", height: "2rem", lineHeight: "14px", paddingTop: "10px"}} maxLength={1000}></textarea>                                        
                    {this.renderSend()}                                        
                </div>                                
            </div>
        )
    }
}
 
export default Input;