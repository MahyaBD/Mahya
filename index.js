const express = require('express');
const app = express();
var userModel = require('./userModel');
const { default: mongoose } = require("mongoose");

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));

app.get("/", (req, res) => {
    res.render("Mahya", {user:null});
});

app.post("/logout", (req, res) => {
    res.render("Mahya", {user:null});
});

app.post("/signup", async (req, res) => {
    console.log("*** /signup request received ***");
    var userDetails = {
        email: req.body.email,
        password: req.body.password,
    };

    userModel.create(userDetails)
        .then((result) => {
            console.log("User data saved to DB");
            res.render("Mahya", {user: userDetails});
        })
        .catch((err) => {
            console.log(err);
            res.render("Mahya", {user: null});
        })
})

app.post("/login", async (req, res) => {
    console.log("*** /login req received ***");
    try {
        var user = await userModel.find({ email: req.body.email, password: req.body.password });
        console.log("** Data fetched from database **");
        // console.log(user);

        console.log("** Seding response back **");
        if(user.length == 0)
        {
            res.reder("Mahya", {user:null});
            return;
        }
        res.render("Mahya", {user:user});
    }
    catch (err) {
        console.log("Failed to retrieve user from database." + JSON.stringify(err));
        res.render("Mahya", {user:null});
    }
})


const port = 3000;
app.listen(port, () => console.log('App started! listening on port ' + port));
