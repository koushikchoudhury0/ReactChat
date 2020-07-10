import URL from "../URL.js"
import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import RegistrationDialog from "./RegistrationDialog"
import Cookies from "js-cookie"
const axios = require('axios').default;


class Landing extends Component {
    state = { 
      handleRegOpen: undefined
    }

    regOpenCallback = (def) => {
        this.handleRegOpen = def;
    }
    
    mockLogin = () => {
      Cookies.set("token", "awesome", {expires: 86400, path: "/"})
      Cookies.set("username", document.getElementById("usernameText").value, {expires: 86400, path: "/"})
      this.props.history.push("/")
    }

    login = (username, password) => {
        return new Promise((resolve, reject) => {
            axios.post(`${URL}/login`, {
                username: username,
                password: password
            }).then(function (response) {
                console.log(response.data)
                if (response.data.statusCode === 1){
                    resolve(response.data)
                } else {
                    reject("Incorrect Username or Password")
                }
            }).catch(function (err) {
                console.log(err)
                reject("Error Occured")
            });
        })     
    }

    loginPromise = async(username, password) => {
        try{
            let data = await this.login(username, password)
            Cookies.set("uid", data.uid, {expires: 86400, path: "/"})
            Cookies.set("token", data.token, {expires: 86400, path: "/"})
            Cookies.set("name", data.name, {expires: 86400, path: "/"})
            Cookies.set("username", data.username, {expires: 86400, path: "/"})            
            this.props.history.push("/")    
        } catch(msg) {
            window.alert(msg)
        }
    }

    render() { 
        return (
            <div className="conatiner">
                <div className="container-fluid" style={{textAlign: "center", marginTop: "20vh"}}>
                    <h1>Chat App</h1>
                    <div>
                        <div>
                            <input id="usernameText" type="text" placeholder="Username" />                            
                        </div>
                        <div style={{margin: "10px"}}>
                            <input id="passwordText" type="text" placeholder="Password"/>                            
                        </div>                        
                        <button className="btn btn-outline-success" onClick={ () => { 
                            this.loginPromise(
                                document.getElementById("usernameText").value,
                                document.getElementById("passwordText").value
                            )}
                        }>Login</button>                        
                        <p style={{marginTop: "20px"}}>Not a user? <a href="#" onClick={this.state.handleRegOpen} data-toggle="modal" data-target="#exampleModalCenter">Register</a> Now</p>                        
                    </div>
                </div>
                <RegistrationDialog callback={this.regOpenCallback} />
            </div>
        );
    }

    componentDidMount() {
      this.setState({handleRegOpen: this.handleRegOpen});
    }
}

export default Landing;