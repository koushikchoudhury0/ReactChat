import React, { Component } from 'react';

class Badge extends Component {
    state = {  }

    style = {
        badge: {
            display: "inline", background: "orangered", color: "white", borderRadius: "15px", padding: "3px 8px", fontSize: "12px"
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