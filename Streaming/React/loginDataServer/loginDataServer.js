const User = require('./User.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

const conString = "postgresql://uzbxyxyi:j7b-g-qv6fw30KkL0dAkN1CMrPMg1sPs@balarama.db.elephantsql.com:5432/uzbxyxyi" //Can be found in the Details page
const client = new pg.Client(conString);
/*
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT (user_id, email, password) from users WHERE email = $1', ["me@mail.com"], function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});
*/

//var users = [];

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
server.options('*', cors());

// for receiving a login request, checking whether the credentials are correct
server.get('/checkCred', (req, res) => {
    let askUser = new User(undefined, req.query.email, req.query.password); //user login data
    let foundUser; //will be set when db responds

    client.connect(function (err) {
        console.log("client connected");
        if (err) {
            //Cannot connect to DataBase for some reason
            console.error('could not connect to DataBase - Try again later.', err);
            res.status(500).send("500 - Internal Server Error");
        }
        client.query('SELECT * from users WHERE email = $1', [askUser.email], function (err, result) {
            if (err) {
                //DataBase responds with error
                console.log("Fatal error: " + err);
                res.status(503).send("503 - Service Unavailable (Database Error)");
            } else if (result.rows.length == 0) {
                //No Error but no results either
                console.log("No match found on given email");
                res.status(404).send("404 - Email does not exist in system");
            } else if (result.rows.length != 0) {
                //store result from DB
                foundUser = new User(result.rows[0].id, result.rows[0].email, result.rows[0].password);

                //check if email and password match
                if (askUser.email !== foundUser.email || askUser.password !== foundUser.password) {
                    console.log("No Match!")
                    res.status(401).send("401 - Email or password does not match!");
                } else if (askUser.email === foundUser.email && askUser.password === foundUser.password) {
                    console.log("User verified - Login Succesfull!")
                    res.status(200).send(foundUser.id);
                }

            }

            //Called data stored locally ending session
            client.end;
            console.log("client ended");



        });
    });

});

// for creating a new user in the system
server.get('/newUser', (req, res) => {
    let newUser = new User(undefined, req.query.email, req.query.password); //users.find(u => u.email == req.query.email);

    client.connect(function (err) {
        console.log("client connected");
        if (err) {
            //Cannot connect to DataBase for some reason
            console.error('could not connect to DataBase - Try again later.', err);
            //res.status(500).send("500 - Internal Server Error");
        }

        client.query("INSERT INTO users(email, password) VALUES($1, $2)", [newUser.email, newUser.password], function (err, result) {
            if (err) {
                if(err == 'error: duplicate key value violates unique constraint "users_email_key"') {
                    res.status(403).send("403 - Mail already exist");
                }
                //DataBase responds with error
                console.log(err);
                //res.status(503).send("503 - Service Unavailable (Database Error)");
            } else if (result.command === "INSERT") {
                console.log("SUCCESS!!");
                res.status(200).send("Success! - User created!");
            }
            client.end;
            console.log("client ended");
        });
    });
});

server.listen(8080);