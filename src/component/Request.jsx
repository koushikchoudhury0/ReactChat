import React, { Component } from 'react';
//import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"
import Cookies from "js-cookie"

class Request extends Component {
    state = {

    }
    render() {    
        let dateArr = new Date(parseInt(this.props.data.moment)).toString().split(" ")
        let bgs = ["rgba(252, 96, 39, 0.05)", "rgba(144, 83, 163, 0.05)", "rgba(83, 131, 163, 0.05)"]
        return (
            <div style={{marginTop: "10px", background: bgs[Math.floor(Math.random() * (+2 - +0)) + +0], padding: "5px", borderRadius: "5px"}}>
                <p style={{marginBottom: "5px"}}>{this.props.data.name}</p>
                <p style={{fontWeight: "bold", margin: "0", width: "100%", textAlign: "left", fontSize: "11px", color: "#757575"}}>{dateArr[1]+" "+dateArr[2]+" "+dateArr[3]+" "+dateArr[4]+" "}</p>
                <div style={{textAlign: "right"}}>
                    <button className="btn btn-outline-danger" style={{marginRight: "10px", padding: "0"}}> <CloseIcon /> </button>
                    <button className="btn btn-outline-success" onClick={()=>{
                            this.props.socket.emit("accept-friend-request", {uid: Cookies.get("id"), reqId: this.props.data.id}, (data)=>{
                                if (data.statusCode === 1){
                                    this.props.removeCallback(this.props.data.id)
                                } else {
                                    window.alert("Error Occurred!");
                                }
                            }) 
                        }} style={{padding: "0"}}
                    > <CheckIcon /> </button>
                </div>
            </div>
        )
    }
}
 
export default Request;