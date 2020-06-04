import React, { Component } from 'react';
import Cookies from "js-cookie"
import "../css/Msg.css"

class Msg extends Component {

    constructor(props){
        super(props)
        console.log("Msg Props: ", props)
    }

    state = { expanded: false }

    style = {
        dateContainer: { width: "100%", textAlign: "center", position: "sticky", top: "0" },
        dateText: { borderRadius: "5px", background: "#7b8c94", color: "white", fontSize: "12px", display: "inline-block", padding: "2px 10px" }
    }

    renderMsg = (lim) => {        
        if (this.state.expanded === true){
            return (this.props.msg.content)
        }
        let len = this.props.msg.content.length;
        if (len>lim)
            return ([this.props.msg.content.substring(0, 50), "...", <span onClick={()=>{this.setState({expanded: true})}} className="more">Show More</span>])
        else
            return (this.props.msg.content)        
    }

    render() { 
        //console.log("Sender: ", this.props.msg.sender, "My Id: ", Cookies.get("id"),  "MyMsg: ", this.props.sender === Cookies.get("id"))
        //console.log(this.props.msg)
        let now = new Date().getTime()
        let ms = parseInt(String(this.props.msg.msgId).substring(0, 13))
        let dateArr = new Date(ms).toString().split(" ")        
        let dateStr = ""
        let gap = now - ms
        let msDay = 24*60*60*1000
        if (gap > 365*msDay) {
            dateStr = `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}` 
        } else if (gap > msDay) {
            dateStr = `${dateArr[1]} ${dateArr[2]}` 
        }
        let lastMs = parseInt(String(this.props.lastMoment).substring(0, 13))
        let lastDateArr = new Date(lastMs).toString().split(" ")
        let thisDate = `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`
        let lastDate = `${lastDateArr[1]} ${lastDateArr[2]} ${lastDateArr[3]}`
        console.log("ThisDateArr: ", thisDate, "LastDateArr: ", lastDate)
        if (thisDate !== lastDate) console.log("Show Date: ", thisDate)
        let timeStr = (new Date(ms).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}))
        dateStr += " "+timeStr
        return (
            <React.Fragment>
                {thisDate !== lastDate?<div style={this.style.dateContainer}><p style={this.style.dateText}>{thisDate}</p></div>:""}
            
                <div ref={(o) => {this.element = o}} className={parseInt(this.props.msg.sender) === parseInt(Cookies.get("id"))?"myMsg":"notMyMsg"} style={{width: "100%"}}>
                    <div style={{margin: "0px 10px", marginTop: this.props.reduceMargin?"3px":"15px", padding: "5px 10px", borderRadius: "5px"}}>
                        <p style={{whiteSpace: "pre-wrap", marginBottom: "2px", fontSize: "14px", wordBreak: "break-word"}}>
                            {this.renderMsg(50)}
                        </p>
                        <p style={{textAlign: "end", marginBottom: "0px", fontSize: "10px"}}>{timeStr}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidUpdate(){
        //console.log("Component Updated")
        if (this.state.expanded === true) this.props.onExpanded(this.element.offsetTop)
    }
}
 
export default Msg;