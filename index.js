const express = require("express");
const app = express();
const path = require("path");
var userModel = require("./userModel");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const caseModel = require("./caseModel");
const appointmentModel = require("./appointmentModel");

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "views")));
app.use(bodyParser.urlencoded({ extended: true }));

var user = null;
let cases = [];
var code = -1;

app.get("/", async (req, res) => {
  try {
    if (this.user?.email) {
      this.cases = await caseModel.find({ userName: this.user?.email || "" });
    } else {
      this.cases = await caseModel.find({});
    }
    console.log("** Data fetched from database **");
    // console.log(cases);

    console.log("** Seding response back **");
    if (cases == undefined || cases.length == 0) {
      res.render("Mahya", {
        user: this.user,
        cases: this.cases,
        success: { code: -1 },
      });
      return;
    }
    this.cases = cases;
    res.render("Mahya", {
      user: this.user,
      cases: this.cases,
      success: { code: this.code },
    });
  } catch (err) {
    console.log(err);
    console.log(
      "Failed to retrieve cases from database." + JSON.stringify(err)
    );
    res.render("Mahya", {
      user: this.user,
      cases: this.cases,
      success: { code: -1 },
    });
  }

});

app.get("/addcase", (req, res) => {
  res.render("AddCase", { user: this.user, success: { code: -1 } });
});

app.get("/cases/:case_id", async (req, res) => {
  try {
    console.log(req.params.case_id);
    let caseID = req.params.case_id;
    let appointmentCase = await caseModel.findById(caseID);
    console.log(appointmentCase);
    res.render("Case", {
      user: this.user,
      data: appointmentCase,
      success: { code: 0 },
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/logout", (req, res) => {
  this.user = null;
  this.cases = [];
  this.code = -1;
  res.redirect("/");
});

app.post("/signup", async (req, res) => {
  console.log("*** /signup request received ***");
  var userDetails = {
    email: req.body.email,
    password: req.body.password,
  };

  userModel
    .create(userDetails)
    .then((result) => {
      console.log("User data saved to DB");
      this.user = userDetails;
      res.render("Mahya", {
        user: userDetails,
        cases: this.cases,
        success: { code: 100 },
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("Mahya", {
        user: this.user,
        cases: this.cases,
        success: { code: 505 },
      });
    });
});

app.post("/login", async (req, res) => {
  console.log("*** /login req received ***");
  try {
    var user = await userModel.find({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("** Data fetched from database **");
   

    console.log("** Seding response back **");
    if (user.length == 0) {
      this.user = null;
      this.code = 404;
      res.redirect("/");
      
      return;
    }
    this.user = user[0];
    res.redirect("/");
    this.code = 0;
    
  } catch (err) {
    console.log("Failed to retrieve user from database." + JSON.stringify(err));
    
    this.code = 404;
    res.redirect("/");
  }
});

app.post("/registercase", async (req, res) => {
  console.log("*** /registercase request received ***");
  var caseDetials = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    fileNumber: req.body.fileNumber,
    description: req.body.description,
    bloodGroup: req.body.bloodGroup,
    hospital: req.body.hospital,
    userName: this.user?.email || "",
  };

  caseModel
    .create(caseDetials)
    .then((result) => {
      console.log("case saved to DB");
      this.code = 20;
      
    })
    .catch((err) => {
      console.log(err);
      res.render("AddCase", {
        user: this.user,
        cases: this.cases,
        success: { code: 505 },
      });
      return;
    });

  try {
    var cases = await caseModel.find({ userName: this.user?.email || "" });
    console.log("** Data fetched from database **");

    console.log("** Seding response back **");
    if (cases == undefined || cases.length == 0) {
      this.code = -1;
      res.redirect("/");
      
      return;
    }
    this.cases = cases;
    res.redirect("/");
    return;
  } catch (err) {
    console.log(
      "Failed to retrieve cases from database." + JSON.stringify(err)
    );
    res.redirect("/");
    return;
  }
});

app.get("/getcases", async (req, res) => {
  console.log("*** /getcases req received ***");
  try {
    var cases = await userModel.find({ userName: this.user?.email || "" });
    console.log("** Data fetched from database **");
    

    console.log("** Seding response back **");
    if (cases.length == 0) {
      res.reder("Mahya", {
        user: this.user,
        cases: this.cases,
        success: { code: -1 },
      });
      return;
    }
    this.cases = cases;
    res.render("/", {
      user: this.user,
      cases: this.cases,
      success: { code: 0 },
    });
  } catch (err) {
    console.log(
      "Failed to retrieve cases from database." + JSON.stringify(err)
    );
    res.render("Mahya", {
      user: this.user,
      cases: this.cases,
      success: { code: -1 },
    });
  }
});

app.post("/bookAppointment", async (req, res) => {
  console.log("*** /bookAppointment req received ***");
  console.log(req.body);
  let appointmentData = req.body;
  const appointment = new appointmentModel({
    name: appointmentData.name,
    age: appointmentData.age,
    mobile_number: appointmentData.mobile_number,
    blood_type: appointmentData.blood_type,
    date: appointmentData.date,
    username: appointmentData.username,
    caseID: new mongoose.Types.ObjectId(appointmentData.caseID),
  });

  try {
    await appointment.save();
    this.code = 200;
    res.redirect(`/cases/${appointmentData.caseID}`);
  } catch (error) {
    console.log(error);
    this.code = 400;
    res.redirect(`/cases/${appointmentData.caseID}`);
  }
});

const port = 3000;
app.listen(port, () => console.log("App started! listening on port " + port));
