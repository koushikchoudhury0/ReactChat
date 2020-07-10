import React, { Component } from 'react';
import Cookies from "js-cookie"
import {SocketContext} from "../context/SocketContext"
import "../css/UserDetail.css"

class UserDetails extends Component {

    static contextType = SocketContext

    state = {  }

    logout = () => {           
        Cookies.remove("token")
        Cookies.remove("username")        
        this.props.history.push(`/`)
        this.context.socket.disconnect()
    }

    render() { 
        return (
            <div className="primary">                
                <h4 className="name">{Cookies.get("name")}</h4>
                <h5 className="username"><span>Username: </span>{Cookies.get("username")}</h5>
                <p className="logout" onClick={()=>{ this.logout() }}>Logout</p>
            </div>
        );
    }
}
 
export default UserDetails;