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
        res.status(401).send("401 - Login failed! (Wrong password)");
    }

    res.end();
});

// for creating a new user in the system
server.post('/newUser', (req, res) => {
    let new_id = users[length-1].id + 1;    // next id will be one higher than the last user in the list, to not create duplicate ids
    users.push(new User(new_id, req.query.email, req.query.username, req.query.password));

    res.end();
});

server.listen(8080);