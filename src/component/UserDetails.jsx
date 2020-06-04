import React, { Component } from 'react';
import Cookies from "js-cookie"

class UserDetails extends Component {
    state = {  }

    logout = () => {           
        Cookies.remove("token")
        Cookies.remove("username")        
        this.props.history.push(`/`)
        this.props.socket.disconnect()
    }

    render() { 
        return (
            <div style={{borderColor: "#039be530", borderWidth: "3px", borderStyle: "solid", borderRadius: "5px", padding: "10px"}}>                
                <h4 style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: "0"}}>{Cookies.get("name")}</h4>
                <h5 style={{margin: "0", fontSize: "13px"}}><span style={{fontWeight: "bold", marginRight: "5px"}}>Username: </span>{Cookies.get("username")}</h5>
                <p style={{marginBottom: "0", fontSize: "12px", color: "orangered", cursor: "pointer"}} onClick={()=>{ this.logout() }}>Logout</p>
            </div>
        );
    }
}
 
export default UserDetails;