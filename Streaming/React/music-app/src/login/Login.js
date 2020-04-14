import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Login() {

    // called when clicking the login-button to enter the service
    const loginButton = () => {
        // TODO call server and check credentials
        fetch("localhost:8080/checkCred?username=" + document.getElementById("usernameField").value + "&password=" + document.getElementById('passwordField').value)
            .then();


        // clearing textfields
        document.getElementById("usernameField").value = "";
        document.getElementById("passwordField").value = "";
    }

    return (
        <div className="loginSystem">
            <h2 className="loginText">Fill in your username:</h2>
            <input id="usernameField" className="usernameBox" autoFocus></input>
            <br />
            <h2 className="loginText">Fill in your password:</h2>
            <input type="password" id="passwordField" className="passwordBox"></input>
            <br />
            <button className="loginButtons" onClick={loginButton}>Submit</button>

            <Link to="/createNewUser"><button className="loginButtons">Create New User</button></Link>
        </div>
    );
}

export default Login;
