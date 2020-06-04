import React, { Component } from 'react';
import CircularProgress from  "@material-ui/core/CircularProgress"
import Request from './Request';
import FAB from "@material-ui/core/Fab"
import Fab from '@material-ui/core/Fab';
import "../css/RequestList.css"
import AddIcon from "@material-ui/icons/Add"
import RequestDialog from "./RequestDialog"

class RequestList extends Component {

    state = {}    

    handleRequestRemoval = (reqId) => {
        console.log("Request: ", reqId, "will be removed from ", this.state.requests)
        this.props.requestRemovalCallback(reqId)
    }

    render() { 
        //console.log("rendering requestlist: ", this.props)
        return (
            <div style={{position: "relative", height: "100%", overflowY: "hidden"}}>
                <div className="customScroll" style={{height: "100%", overflowY: "scroll", paddingRight: "5px", paddingBottom: "80px"}}>
                {this.props.data===undefined?
                <div style={{width: "100%", textAlign: "center", marginTop: "100px"}}>
                    <CircularProgress />
                </div>
                    :
                    this.props.data.length===0?
                    <p style={{color: "#6c757d", opacity: "1", marginTop: "100px", width: "100%", textAlign: "center", fontSize: "12px"}}>You have no new friend requests</p>
                        :                    
                        this.props.data.map((request, index)=>(
                            <Request key={request.id} data={request} socket={this.props.socket} removeCallback={this.handleRequestRemoval}/>  
                        ))}
                </div>
                <Fab onClick={() => { this.reqDialog.openDialog() }} variant="extended" size="small" color="secondary" style={{position: "absolute", bottom: "10px", right: "10px", outline: "none", border: "none", fontSize: "14px", paddingRight: "15px", paddingLeft: "15px", textTransform: "none"}} > <AddIcon style={{fontSize: "20px", marginRight: "5px"}} /> New Request </Fab>
                <RequestDialog socket={this.props.socket} ref={(o) => { this.reqDialog = o }} />
            </div>
            
        );
    }
}
 
export default RequestList;