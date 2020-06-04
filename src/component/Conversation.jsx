import React, { Component } from 'react';
import Msg from './Msg';
import "../css/Conversation.css"
import DownIcon from "@material-ui/icons/KeyboardArrowDown"
import Fab from "@material-ui/core/Fab"
import Badge from "@material-ui/core/Badge"

class Conversation extends Component {
    state = { 
        scrolledUp: false,
        unread: 0
    }

    vars = {
        lastScrollTop: 0,
    }

    style = {
        container: { height: "90%", overflowY: "scroll", position: "absolute", bottom: "10%", width: "100%", marginBottom: "0", paddingLeft: "0" }
    }

    scrollToBottom = () => {
        //let elem = document.getElementById("list")
        if (this.fab.style.visibility === "visible"){
            this.setState({unread: this.state.unread+1})
            return
        }
        this.listElement.scrollTop = this.listElement.scrollHeight
        this.setState({unread: 0})
    }

    scrollToExpanded = (offset) => {
        console.log("Scrolling to: ", offset)
        document.getElementById("list").scrollTop = offset
    }

    handleScroll = () => {                
        var st = this.listElement.scrollTop;
        var sh = this.listElement.scrollHeight;
        var oh = this.listElement.offsetHeight;
        console.log("ST: ", st, "SH: ", sh, "OH: ", oh, "sh-oh: ", sh-oh)
        if (st > this.vars.lastScrollTop){
            console.log("Scolled Down")            
            if (/* this.state.scrolledUp === true */ this.fab.style.visibility === "visible" && st>(sh-oh-100/* -oh */)) {
                //this.setState({scrolledUp: false})
                this.fab.style.visibility="hidden"
            }
        } else {
            console.log("Scolled Up")             
            if (/* this.state.scrolledUp === false */ this.fab.style.visibility === "hidden" && st<(sh-oh-100/* -oh */)) {
                //this.setState({scrolledUp: true})
                this.fab.style.visibility="visible"
            }
        }
        this.vars.lastScrollTop = st <= 0 ? 0 : st        
    }

    renderItems = () => {
        if (this.props.conversation.length===0){
            return (
                <div className="container-fluid" style={{marginTop: "45%", textAlign: "center"}}>
                    <p>Either of you haven't started talking yet. Send a message now.</p>
                </div>
            )
        } else {
            return (
                this.props.conversation.map((msg, i) => (                        
                    <Msg 
                    reduceMargin={
                        i===0?false:(parseInt(this.props.conversation[i-1].sender)===parseInt(this.props.conversation[i].sender))                        
                    } 
                    onExpanded={this.scrollToExpanded} 
                    lastMoment={i==0?undefined:this.props.conversation[i-1].msgId}
                    key={msg.msgId} 
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

    render() {
        
        return (
            <div ref={(o)=>{this.listElement = o}} onScroll={()=>{this.handleScroll()}} id="list" className="custom-scroll" style={this.style.container}>
                {/* <div style={{overflowY: "hidden"}}>
                                                      
                </div> */}
                {this.renderItems()}
                <Badge ref={(o)=>{this.fab=o}} badgeContent={this.state.unread} color="secondary" style={{position: "sticky", bottom: "5%", left: "86%", visibility: "hidden"}}>
                    <Fab onClick={ ()=>{ this.setState({unread: 0}); this.listElement.scrollTop = this.listElement.scrollHeight } } size="small" style={{background: "#039be5", fontSize: "14px", outline: "none", border: "none", marginLeft: "20px"}} > <DownIcon style={{color:"white"}} /> </Fab>
                </Badge>
            </div>
        )
    }

    
}
 
export default Conversation;