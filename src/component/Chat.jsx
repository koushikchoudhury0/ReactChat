import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Badge from "./Badge"
class Chat extends Component {
    /* constructor(props){
        super(props)
        console.log("Chat props: ", props)
    } */
    state = {  }
    style = {
        notSelected: {
            paddingBottom: "5px", cursor: "pointer", width: "100%", marginTop: "5px", paddingTop: "8px", background: "#e0dfdf1f", borderRadius: "5px", borderColor: "#eaeaea", borderStyle: "solid", borderWidth: "2px", transition: "0.3s"
        },
        isSelected: {
            paddingBottom: "5px", cursor: "pointer", width: "100%", marginTop: "10px", marginBottom: "10px", paddingTop: "8px", transition: "0.3s", borderRadius: "0", borderColor: "transparent", borderStyle: "solid", borderWidth: "2px", position: "sticky", top: "0", bottom: "0", background: "white", transform: "scale(1.0)", paddingLeft: "3px", opacity: 1 
        }
    }
    render() {
        //console.log("CHAT: ", this.props.data) 
        return (
            <div ref={(o)=>{this.container = o}} onClick={() => { this.container.style.opacity=0.5; this.props.onChatClick(this.props.data.uid, this.props.data.name) }} className="container" style={this.props.selected === true?this.style.isSelected:this.style.notSelected}>
                <div className="row">
                    <div className="col-sm-10 col-md-10 col-lg-10">
                        <h6 style={{marginBottom: "0", fontWeight: "bold", wordBreak: "break-all", transition: "0.5s", color: this.props.selected===true?"#4a6f98":"", fontSize: this.props.selected===true?"18px":""}}>
                            {this.props.data.name}                            
                        </h6>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2" style={{padding: "0", transform: "translateY(-2px)"}}>
                        <Badge unread={this.props.data.unread} />
                    </div>
                </div>                
                {this.props.data.lastMsg === null?
                    <p style={{fontSize: "14px", marginBottom: "0", opacity: "0.7"}}>                    
                        <span style={{fontWeight: "bold", fontSize: "12px"}}>Start conversation</span>                    
                    </p>
                    :
                    <p style={{marginBottom: "0", opacity: "0.7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: this.props.selected===true?"black":"", transition: "0.5s", fontSize: this.props.selected===true?"16px":"14px"}}>                    
                        <span style={{fontWeight: "bold", fontSize: "12px"}}>{this.props.data.sender===1?'You: ':''}</span>
                        {this.props.data.lastMsg}
                    </p>
                }
            </div>
        );
    }
}
 
export default Chat;