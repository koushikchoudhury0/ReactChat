import React, { Component } from 'react';

class Friend extends Component {
    state = {  }
    render() { 
        return (
            <div style={{padding: "10px 20px", height: "10%", position: "absolute", bottom: "90%", background: "yellow", width: "100%"}}>
                <h4>{this.props.friend.name}</h4>
            </div>
        )
    }
}
 
export default Friend;