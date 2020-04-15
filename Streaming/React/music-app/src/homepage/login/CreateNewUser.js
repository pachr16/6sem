import React from 'react';
//import '../App.css';
import { Link } from 'react-router-dom';


function createUser() {

    if (document.getElementById('unameField').value === "" ||
        document.getElementById('emailField').value === "" ||
        document.getElementById('passField').value === "") {

        document.getElementById('responseText').innerHTML = "Please fill in all fields!";

    } else {
        fetch("http://localhost:8080/newUser?username=" +
            document.getElementById("unameField").value +
            "&email=" + document.getElementById("emailField").value +
            "&password=" + document.getElementById("passField").value,
            {
                method: 'POST'
            })
            .then(resp => {
                if (resp.status === 200) {
                    document.getElementById('responseText').style.color="black";
                    document.getElementById('responseText').innerHTML="User has been registered! You can now go back to login.";
                }
                else {
                    document.getElementById('responseText').innerHTML="Error! I think that email already exists in the system!";
                }
            });

        document.getElementById('unameField').value = "";
        document.getElementById('emailField').value = "";
        document.getElementById('passField').value = "";
    }
}

function CreateNewUser() {
    return (
        <div className="loginSystem">
            <h2 className="loginText">
                Input your email:
            </h2>
            <input className="usernameBox" id="emailField"></input>
            <br />
            <h2 className="loginText">
                Input username for your new user:
            </h2>
            <input className="usernameBox" id="unameField"></input>
            <br />
            <h2 className="loginText">
                Input password for your new user:
            </h2>
            <input type="password" className="passwordBox" id="passField"></input>
            <br />
            <button className="loginButtons" onClick={createUser}>Submit</button>
            <Link to="/"><button className="loginButtons">Back to Login</button></Link>
            <h3 className="respText" id="responseText"></h3>
        </div>
    );
}

export default CreateNewUser;
