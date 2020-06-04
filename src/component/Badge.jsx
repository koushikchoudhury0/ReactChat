import React, { Component } from 'react';

class Badge extends Component {
    state = {  }

    style = {
        badge: {
            transform: "translateY(-1px)", display: "inline-block", background: "orangered", color: "white", borderRadius: "15px", padding: "3px 8px", fontSize: "12px", marginLeft: "10px", marginBottom: "0"
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