import React, { Component } from 'react';
//import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"
import Cookies from "js-cookie"
import AcceptButton from "@material-ui/core/IconButton"
import RejectButton from "@material-ui/core/IconButton"

class Request extends Component {
    
    constructor(props){
        super(props)
        console.log(this.props.data.moment)
        let ms = this.props.data.moment
        this.timeStr = (new Date(Number(ms)).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}))
        let dateArr = new Date(parseInt(this.props.data.moment)).toString().split(" ")        
        this.dateStr = this.formatDate(dateArr)        
    }

    formatDate = (dateArr) => {
        let todayArr = new Date().toString().split(" ")
        console.log(dateArr, todayArr, dateArr[2] !== todayArr[2], dateArr[1] !== todayArr[1])
        if (dateArr[2] !== todayArr[2] || dateArr[1] !== todayArr[1]){
            return `${parseInt(dateArr[2])} ${dateArr[1]} ${dateArr[3]}`
        } else {
            //console.log(parseInt(dateArr[2]), "-", parseInt(todayArr[2]))
            let diffDays = Math.abs(parseInt(dateArr[2]) - parseInt(todayArr[2]))
            if (diffDays==0) return "Today"
            else if (diffDays==1) return "Yesterday"
            else if (diffDays<365) return `${parseInt(dateArr[2])} ${dateArr[1]}`
            else return `${parseInt(dateArr[2])} ${dateArr[1]} ${dateArr[3]}`
        }
    }
    
    state = {}

    style = {
        body: { background: "#fefefe", borderRadius: "5px", borderColor: "#eaeaea", borderStyle: "solid", borderWidth: "2px", padding: "10px 15px 5px 15px", marginBottom: "10px"}
    }

    render() {                  
        return (
            <div style={this.style.body}>
                <h6 style={{marginBottom: "5px", fontWeight: "bold", wordBreak: "break-all", fontSize: "16px"}}>{this.props.data.name}</h6>
                <p style={{fontWeight: "normal", margin: "0", width: "100%", textAlign: "left", fontSize: "12px", color: "#757575"}}>{`${this.dateStr} ${this.timeStr}`}</p>
                <div style={{textAlign: "right"}}>
                    <RejectButton onClick={()=>{
                            this.props.socket.emit("reject-friend-request", {uid: Cookies.get("id"), reqId: this.props.data.id}, (data)=>{
                                if (data.statusCode === 1){
                                    this.props.removeCallback(this.props.data.id)
                                } else {
                                    window.alert("Error Occurred!");
                                }
                            })
                        }} style={{marginRight: "10px", padding: "0", outline: "none", border: "none"}}> 
                        <CloseIcon color="secondary" /> 
                    </RejectButton>
                    <AcceptButton onClick={()=>{
                            this.props.socket.emit("accept-friend-request", {uid: Cookies.get("id"), reqId: this.props.data.id}, (data)=>{
                                if (data.statusCode === 1){
                                    this.props.removeCallback(this.props.data.id)
                                } else {
                                    window.alert("Error Occurred!");
                                }
                            }) 
                        }} style={{padding: "0"}}> 
                        <CheckIcon style={{color: "seagreen"}} /> 
                    </AcceptButton>
                </div>
            </div>
        )
    }
}
 
export default Request;