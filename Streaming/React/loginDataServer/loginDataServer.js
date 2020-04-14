const User = require('./User.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


var users = [];

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
server.options('*', cors());

// for receiving a login request, checking whether the credentials are correct
server.get('/checkCred', (req, res) => {
    let foundU = users.find(u => u.email == req.query.email);

    if (foundU == undefined) {
        res.status(404).send("404 - Email does not match any users in the system!");
    }
    else if (foundU.password == req.query.password) {
        res.status(200).send("200 - Login successful!");
    } else {
        res.status(401).send("401 - Login failed! (Probably due to wrong password, the email exists)");
    }

    res.end();
});

// for creating a new user in the system
server.post('/newUser', (req, res) => {

    let foundU = users.find(u => u.email == req.query.email);

    if (foundU != undefined) {
        res.status(400);
        res.send("400 - Email already exists in the system!");
    } else {
        let new_id = 0;
        if (users.length > 0) {
            new_id = users[users.length - 1].id + 1;    // next id will be one higher than the last user in the list, to not create duplicate ids
        }

        let newuser = new User(new_id, req.query.email, req.query.username, req.query.password);
        users.push(newuser);

        console.log("Just created new user. List now holds:");
        users.forEach(element => {
            console.log(element.id + ", Name: " + element.username + ", email: " + element.email + ", password: " + element.password);
        });

        res.status(200);
        res.send("User has been created! ID: " + new_id);
    }

    res.end();
});

server.listen(8080);