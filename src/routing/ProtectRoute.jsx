import React/* , { Component } */ from 'react'
import {Route, Redirect} from "react-router-dom"
import Cookies from "js-cookie"
import { SocketProvider } from '../context/SocketContext'
import { ConversationProvider } from '../context/ConversationContext'

const ProtectedRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {(props) => {
                return (
                    Cookies.get("token")?                        
                        <SocketProvider> 
                            <ConversationProvider>
                                <Component {...props} />
                            </ConversationProvider>
                        </SocketProvider>
                        :
                        <Redirect to={{
                            pathname: "/land"/* ,
                            state: {from: props.location} */
                        }} />
                )
            }}
        />
    )
}

export default ProtectedRoute