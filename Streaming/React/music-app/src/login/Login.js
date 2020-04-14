import React, { useState } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';

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

    const newUserButton = () => {
        
    }

    return (
        <div className="loginSystem">
            <h2 className="loginText">Fill in your username:</h2>
            <br />
            <textarea id="usernameField" className="usernameBox" autoFocus></textarea>
            <br />
            <h2 className="loginText">Fill in your password:</h2>
            <br />
            <textarea id="passwordField" className="passwordBox"></textarea>
            <br />
            <button onClick={loginButton}>Submit</button>
            <button>Create New User</button>
        </div>
    );
}

export default Login;
