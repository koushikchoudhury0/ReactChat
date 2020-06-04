import React/* , { Component } */ from 'react'
import {Route, Redirect} from "react-router-dom"
import Cookies from "js-cookie"

const ProtectedRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {(props) => {
                return (
                    Cookies.get("token")?
                    <Component {...props} />
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