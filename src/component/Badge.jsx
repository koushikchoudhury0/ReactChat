import React, { Component } from 'react';

class Badge extends Component {
    state = {  }

    style = {
        badge: {
            /* width: "80%",  */display: "inline-block", background: "#5e92b9", marginBottom: "0", textAlign: "center", fontWeight: "bold", color: "white", borderRadius: "15px", padding: "0px 8px", fontSize: "11px"
        }
    }

    render() { 
        if (this.props.unread === 0){
            return ("")
        } else if (this.props.unread>99) {
            return (
                <p style={this.style.badge}>
                    99+
                </p>
            )    
        } else {
            return (
                <p style={this.style.badge}>
                    {this.props.unread}                    
                </p>
            )
        }        
    }
}
 
export default Badge;