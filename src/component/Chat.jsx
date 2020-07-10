import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Badge from "./Badge"
import Cookies from "js-cookie"
//import {SocketContext} from "../context/SocketContext"
import {ConversationContext} from "../context/ConversationContext"
import "../css/Chat.css"

class Chat extends Component {
    /* constructor(props){
        super(props)
        console.log("Chat props: ", props)
    } */

    static contextType = ConversationContext

    state = { 

    }

    /* style = {
        notSelected: {
            paddingBottom: "5px", cursor: "pointer", width: "100%", marginTop: "5px", paddingTop: "8px", background: "#e0dfdf1f", borderRadius: "5px", borderColor: "#eaeaea", borderStyle: "solid", borderWidth: "2px", transition: "0.3s"
        },
        isSelected: {
            paddingBottom: "5px", cursor: "pointer", width: "100%", marginTop: "10px", marginBottom: "10px", paddingTop: "8px", transition: "0.3s", borderRadius: "0", borderColor: "transparent", borderStyle: "solid", borderWidth: "2px", position: "sticky", top: "0", bottom: "0", background: "white", transform: "scale(1.0)", paddingLeft: "3px", opacity: 1 
        }
    } */

    formatDate = (ms) => {
        let dateArr = new Date(ms).toString().split(" ")                                
        let thisDate = `${parseInt(dateArr[2])} ${dateArr[1]} ${dateArr[3]}`        
        let timeStr = (new Date(ms).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}))          
        let srcDateArr = new Date(ms).toLocaleDateString().split("/")            
        let thisDateArr = new Date().toLocaleDateString().split("/")        
        if (srcDateArr[2] !== thisDateArr[2] || srcDateArr[1] !== thisDateArr[1]){
            return thisDate
        } else {
            //console.log(parseInt(srcDateArr[0]), "-", parseInt(thisDateArr[0]))
            let diffDays = Math.abs(parseInt(srcDateArr[0]) - parseInt(thisDateArr[0]))
            if (diffDays==0) return timeStr
            else if (diffDays==1) return "Yesterday"            
            else return thisDate
        }      
    }

    render() {
        //console.log("CHAT: ", this.props.data) 
        const {invokeConversation} = this.context
        return (
            <div 
                ref={(o)=>{this.container = o}} 
                className={`container ${this.props.selected === true?"selected":"not-selected"}`}
                /* style={this.props.selected === true?this.style.isSelected:this.style.notSelected} */
                onClick={() => { 
                    this.container.style.opacity=0.5;
                    invokeConversation(this.props.data.userDetails._id, this.props.data.userDetails.name, this.props.data._id) 
                }}>
                <div className="row">
                    <div className="col-sm-8 col-md-8 col-lg-8">
                        <h6 className="user-full-name">
                            {this.props.data.userDetails.name}                            
                        </h6>
                        {this.props.data.content === undefined?
                            <p className="no-preview">                    
                                <span>Say Hi to your friend</span>                    
                            </p>
                            :
                            <p className="preview">                    
                                <span>{this.props.data.trueSender===Cookies.get("uid")?'You: ':''}</span>
                                {this.props.data.content}
                            </p>
                        }
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4" style={{padding: "0", textAlign: "end", paddingRight: "10px"}}>
                        <h6 style={{margin: "0 0 1px 0", fontSize: "12px", transition: "0.1s", opacity: this.props.selected === true?"0":"1", color: "rgb(94, 146, 185)"}}>{this.formatDate(this.props.data.moment)}</h6>
                        <Badge unread={this.props.data.unread === undefined?0:this.props.data.unread} />
                    </div>
                </div>                                
            </div>
        );
    }
}
 
export default Chat;