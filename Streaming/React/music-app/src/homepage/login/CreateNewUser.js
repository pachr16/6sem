import React from 'react';
import { Link } from 'react-router-dom';


function createUser() {

    if (document.getElementById('emailField').value === "" ||
        document.getElementById('passField').value === "") {

        document.getElementById('responseText').innerHTML = "Please fill in all fields!";

    } else {
        fetch("http://192.168.99.100:8080/newUser?email=" + document.getElementById("emailField").value +
            "&password=" + document.getElementById("passField").value,
            {
                method: 'POST',
                credentials: 'same-origin'
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
            <input className="usernameBox" id="emailField" placeholder="Enter email"></input>
            <br />
            <h2 className="loginText">
                Input password for your new user:
            </h2>
            <input type="password" className="passwordBox" id="passField" placeholder="Enter password"></input>
            <br />
            <button className="loginButtons" onClick={createUser}>Submit</button>
            <Link to="/"><button className="loginButtons">Back to Login</button></Link>
            <h2 className="respText" id="responseText"></h2>
        </div>
    );
}

export default CreateNewUser;
