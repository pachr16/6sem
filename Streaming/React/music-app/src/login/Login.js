import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Login() {

    // called when clicking the login-button to enter the service
    const loginButton = () => {

        // call server and check credentials
        fetch("http://localhost:8080/checkCred?email=" + document.getElementById("emailField").value + "&password=" + document.getElementById('passwordField').value)
            .then(resp => {
                if (resp.status === 200) {
                    window.location.href="http://localhost:3000/createNewUser";
                } else if (resp.status === 404) {
                    document.getElementById("warnText").innerHTML="That email does not match any users in the system!";
                } else if (resp.status === 401) {
                    document.getElementById("warnText").innerHTML="Login failed! (Probably due to wrong password, the email exists)";
                }
            });


        // clearing textfields
        document.getElementById("emailField").value = "";
        document.getElementById("passwordField").value = "";
    }

    return (
        <div className="loginSystem">
            <h2 className="loginText">Fill in your email:</h2>
            <input id="emailField" className="usernameBox" autoFocus></input>
            <br />
            <h2 className="loginText">Fill in your password:</h2>
            <input type="password" id="passwordField" className="passwordBox"></input>
            <br />
            <button className="loginButtons" onClick={loginButton}>Submit</button>

            <Link to="/createNewUser"><button className="loginButtons">Create New User</button></Link>

            <h3 className="respText" id="warnText"></h3>
        </div>
    );
}

export default Login;
