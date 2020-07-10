import React, { Component } from 'react';
import Cookies from "js-cookie"
import "../css/Msg.css"

class Msg extends Component {

    /* constructor(props){
        super(props)
        console.log("Msg Props: ", props)
    } */

    state = { expanded: false }

    renderMsg = (lim) => {        
        if (this.state.expanded === true){
            return (this.props.msg.content)
        }
        let len = this.props.msg.content.length;
        if (len>lim)
            return ([this.props.msg.content.substring(0, 50), "...", <span key="none" onClick={()=>{this.setState({expanded: true})}} className="more">Show More</span>])
        else
            return (this.props.msg.content)        
    }

    formatDateHead = (thisDate, ms) => {          
        let srcDateArr = new Date(ms).toLocaleDateString().split("/")            
        let thisDateArr = new Date().toLocaleDateString().split("/")        
        if (srcDateArr[2] !== thisDateArr[2] || srcDateArr[1] !== thisDateArr[1]){
            return thisDate
        } else {
            //console.log(parseInt(srcDateArr[0]), "-", parseInt(thisDateArr[0]))
            let diffDays = Math.abs(parseInt(srcDateArr[0]) - parseInt(thisDateArr[0]))
            if (diffDays==0) return "Today"
            else if (diffDays==1) return "Yesterday"            
            else return thisDate
        }      
    }

    render() {                 
        let ms = parseInt(String(this.props.msg.moment).substring(0, 13))
        let dateArr = new Date(ms).toString().split(" ")                
        let lastMs = parseInt(String(this.props.lastMoment).substring(0, 13))
        let lastDateArr = new Date(lastMs).toString().split(" ")
        let thisDate = `${parseInt(dateArr[2])} ${dateArr[1]} ${dateArr[3]}`
        let lastDate = `${parseInt(lastDateArr[2])} ${lastDateArr[1]} ${lastDateArr[3]}`        
        let timeStr = (new Date(ms).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}))
        return (
            <React.Fragment>
                {thisDate !== lastDate?<div className="dateContainer"><p className="dateText">{this.formatDateHead(thisDate, ms)}</p></div>:""}
            
                <div ref={(o) => {this.element = o}} className={`msg ${this.props.msg.senderUid === Cookies.get("uid")?"myMsg":"notMyMsg"}`}>
                    <div className={`msgPrimary ${this.props.reduceMargin===true?"noMargin":""}`}>
                        <p className="msgContent">
                            {this.renderMsg(50)}
                        </p>
                        <p className="timeText">{timeStr}</p>
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