import React, { Component, createContext } from 'react'
import sio from "socket.io-client"
import URL from "../URL.js"
import Cookies from "js-cookie"

export class SocketProvider extends Component {
    
    state = { socket: undefined }
    
    render() { 
        return (
            <SocketContext.Provider value={{...this.state}}>
                {this.props.children}
            </SocketContext.Provider>
        );
    }

    componentDidMount() {
        let socket = sio(`${URL}`)
        console.log("Connected to Socket")
        socket.on("start-establish", () => {
            console.log("Server started establishment")
            socket.emit("establish", {token: Cookies.get("token")}, (data) => {
                if (data.statusCode === 1){
                    console.log("Socket Established")
                    this.setState({socket: socket})
                    /* socket.emit("get-all-chats", {token: Cookies.get("token")}, (data) => {
                        console.log("all-chats from server: ", data)                    
                        if (data.statusCode === 1) this.setState({chats: data.chats})                        
                    })
                    socket.emit("get-friend-requests", {token: Cookies.get("token")}, (requests) => {
                        console.log(requests)
                        this.setState({friendRequests: requests})
                    }) */
                } else if (data.cause === 2) {
                    //logout
                } else {
                    //show toast/dialog
                }
                 
            })
        })        
    }
}
 
export const SocketContext = createContext();
