import React, { Component } from 'react';
import CircularProgress from  "@material-ui/core/CircularProgress"
import Request from './Request';
import FAB from "@material-ui/core/Fab"
import Fab from '@material-ui/core/Fab';
import "../css/RequestList.css"
import AddIcon from "@material-ui/icons/Add"
import RequestDialog from "./RequestDialog"
import Cookies from "js-cookie"
import {SocketContext} from "../context/SocketContext"
import ArrowDownImage from "../img/SpiralArrowDown.png"

class RequestList extends Component {

    static contextType = SocketContext

    state = { friendRequests: undefined }  
    
    removeFR = (FRId) => {
        let remRequests = this.state.friendRequests.filter(o => o._id !== FRId)
        console.log(remRequests)
        this.setState({friendRequests: remRequests})
    }

    render() {         
        return (
            <div style={{position: "relative", height: "100%", overflowY: "hidden"}}>
                <div className="customScroll" style={{height: "100%", overflowY: "scroll", paddingRight: "5px", paddingBottom: "80px"}}>
                {this.state.friendRequests === undefined?
                <div style={{width: "100%", textAlign: "center", marginTop: "100px"}}>
                    <CircularProgress />
                </div>
                    :
                    this.state.friendRequests.length===0?
                    <p style={{color: "#6c757d", opacity: "1", marginTop: "10px", width: "100%", textAlign: "center", fontSize: "12px", fontFamily: "Montserrat"}}>                        
                        You have no new <b>Friend Requests</b><br/>Click here to send one
                        <img src={ArrowDownImage} style={{marginTop: "25px"}} style={{height: "40%", width: "70%", opacity: "0.1", marginTop: "30px", transform: "rotate(10DEG) translateX(10px)"}} />
                        </p>                        
                        :                    
                        this.state.friendRequests.map((request, index)=>(
                            <Request key={request._id} data={request} removeCallback={this.removeFR}/>  
                        ))}
                </div>
                <Fab onClick={() => { this.reqDialog.openDialog() }} variant="extended" size="small" color="secondary" style={{position: "absolute", bottom: "15px", right: "15px", outline: "none", border: "none", fontSize: "14px", paddingRight: "15px", paddingLeft: "15px", textTransform: "none", fontFamily: "Quicksand", fontWeight: "bold"}} > <AddIcon style={{fontSize: "20px", marginRight: "5px"}} /> New Request </Fab>
                <RequestDialog ref={(o) => { this.reqDialog = o }} />
            </div>
            
        );
    }

    componentDidMount() {
        
        //Listen for & emit FR events only

        this.context.socket.emit("get-friend-requests", {token: Cookies.get("token")}, (requests) => {
            console.log("all-FRs: ", requests)
            this.setState({friendRequests: requests})
        })

        this.context.socket.on("new-friend-request", (data) => {
            console.log("New FR: ", data)
            this.setState({friendRequests: [data, ...this.state.friendRequests]})
        }) 

    }
}
 
export default RequestList;