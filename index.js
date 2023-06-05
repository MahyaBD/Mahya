const express = require('express');
const app = express();
var userModel = require('./userModel');
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const caseModel = require('./caseModel');
const appModel = require("./appointmentModel")

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

var user = null;
let cases = [];

app.get("/", async (req, res) => {
    try {
        var cases = await caseModel.find({ userName: this.user?.email || "" });
        console.log("** Data fetched from database **");

        console.log("** Seding response back **");
        if (cases == undefined || cases.length == 0) {
            res.reder("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
            return;
        }
        this.cases = cases;
        res.render("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
    }
    catch (err) {
        console.log("Failed to retrieve cases from database." + JSON.stringify(err));
        res.render("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
    }

    // res.render("Mahya", {user:this.user, cases: this.cases, success:{code:-1}});
});

app.get("/addcase", (req, res) => {
    res.render("AddCase", { user: this.user, success: { code: -1 } });
});

app.post("/cases", (req, res) => {
    res.render("Case", { user: this.user, data: req.body });
});

app.post("/logout", (req, res) => {
    this.user = null;
    this.cases = [];
    res.render("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
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
            this.user = userDetails;
            res.render("Mahya", { user: userDetails, cases: this.cases, success: { code: 100 } });
        })
        .catch((err) => {
            console.log(err);
            res.render("Mahya", { user: this.user, cases: this.cases, success: { code: 505 } });
        })
})

app.post("/login", async (req, res) => {
    console.log("*** /login req received ***");
    try {
        var user = await userModel.find({ email: req.body.email, password: req.body.password });
        console.log("** Data fetched from database **");
        // console.log(user);

        console.log("** Seding response back **");
        if (user.length == 0) {
            this.user = null;
            res.reder("Mahya", { user: this.user, cases: this.cases, success: { code: 404 } });
            return;
        }
        this.user = user[0];
        res.render("Mahya", { user: this.user, cases: this.cases, success: { code: 0 } });
    }
    catch (err) {
        console.log("Failed to retrieve user from database." + JSON.stringify(err));
        res.render("Mahya", { user: this.user, cases: this.cases, success: { code: 404 } });
    }
})


app.post("/registercase", async (req, res) => {
    console.log("*** /registercase request received ***");
    var caseDetials = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fileNumber: req.body.fileNumber,
        description: req.body.description,
        bloodGroup: req.body.bloodGroup,
        hospital: req.body.hospital,
        userName: this.user?.email || ""
    };

    caseModel.create(caseDetials)
        .then((result) => {
            console.log("case saved to DB");
            // res.render("Mahya", {user: this.user, cases: this.cases, success:{code:20}});
        })
        .catch((err) => {
            console.log(err);
            res.render("AddCase", { user: this.user, cases: this.cases, success: { code: 505 } });
            return
        })

    try {
        var cases = await caseModel.find({ userName: this.user?.email || "" });
        console.log("** Data fetched from database **");

        console.log("** Seding response back **");
        if (cases == undefined || cases.length == 0) {
            res.reder("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
            return;
        }
        this.cases = cases;
        res.render("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
        return;
    }
    catch (err) {
        console.log("Failed to retrieve cases from database." + JSON.stringify(err));
        res.render("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
        return;
    }
})


app.get("/getcases", async (req, res) => {
    console.log("*** /getcases req received ***");
    try {
        var cases = await userModel.find({ userName: this.user?.email || "" });
        console.log("** Data fetched from database **");
        // console.log(user);

        console.log("** Seding response back **");
        if (cases.length == 0) {
            res.reder("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
            return;
        }
        this.cases = cases;
        res.render("/", { user: this.user, cases: this.cases, success: { code: 0 } });
    }
    catch (err) {
        console.log("Failed to retrieve cases from database." + JSON.stringify(err));
        res.render("Mahya", { user: this.user, cases: this.cases, success: { code: -1 } });
    }
})

app.post("/bookappointment", async (req, res) => {
    console.log("*** /bookappointment request received ***");
    var appDetials = {
        name: req.body.name,
        age: req.body.age,
        mobile: req.body.mobile,
        bloodGroup: req.body.bloodGroup,
        date: req.body.date,
        userName: this.user?.email || ""
    };

    appModel.create(appDetials)
        .then((result) => {
            console.log("appointment saved to DB");
            res.render("Mahya", {user: this.user, cases: this.cases, success:{code:30}});
        })
        .catch((err) => {
            console.log(err);
            res.render("Case", { user: this.user, cases: this.cases, success: { code: 50 } });
            return
        })

})

const port = 3000;
app.listen(port, () => console.log('App started! listening on port ' + port));
