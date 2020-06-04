import React, { Component } from 'react';
import CircularProgress from  "@material-ui/core/CircularProgress"
import Request from './Request';
class RequestList extends Component {
    state = {}    

    handleRequestRemoval = (reqId) => {
        console.log("Request: ", reqId, "will be removed from ", this.state.requests)
        this.props.requestRemovalCallback(reqId)
    }

    render() { 
        console.log("rendering requestlist: ", this.props)
        return (
            
            this.props.data===undefined?
            <div style={{width: "100%", textAlign: "center", marginTop: "100px"}}>
                <CircularProgress />
            </div>
                :
                this.props.data.length===0?
                <p style={{color: "#6c757d", opacity: "1", marginTop: "100px", width: "100%", textAlign: "center", fontSize: "12px"}}>You have no new friend requests</p>
                    :
                    this.props.data.map((request, index)=>(
                        <Request key={request.id} data={request} socket={this.props.socket} removeCallback={this.handleRequestRemoval}/>  
                    ))                    
            
        );
    }
}
 
export default RequestList;