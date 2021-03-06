const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Doctor = require("../../models/Doctors");
const Appointment = require("../../models/appointment");

var ObjectId = require('mongodb').ObjectId;

// const appo1 = new Appointment({
//   patientId: "61e6512dbde11d1bcd56f5b4",
//   doctorId: "61e6dc8928a240f18df1b6d6",
//   date: "12-02-2022",
//   description: "5th",
//   status: "Pending",
// });
// appo1.save();

// const doctor1 = new Doctor({
//   name: "Alan Runner",
//   specialization: "Zoologist",
//   gender: "Male",
//   age: 50,
//   about: "One of the best doctors of zoology in area",
//   location: "Mumbai"
// });

// doctor1.save();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/getdoc", (req,res) => {
  Doctor.find({}, (err,data) => {
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
      res.send(data);
    }
  })
});

router.post("/bookappointment",(req,res)=>{
  console.log(req.body);

  const newAppointment = new Appointment({
    patientId: req.body.userId,
    doctorId: req.body.docName,
    date: req.body.date,
    description: req.body.desp
  });

  newAppointment.save()
  .then(user => res.json())
  .catch(err => console.log(err));


})

router.post("/getusers",(req,res)=>{
  console.log(req.body);

  let temp= req.body.userId;
  User.findOne({id:temp},(err,data)=>{
    if(err) {
      console.log(err);
    }
    else {
      res.send(data)
    }
  })
})

router.post("/getappointment/:user_id", (req,res) => {
  console.log(req.params.user_id);
  var user_id = new ObjectId(req.params.user_id);
  Appointment.find({patientId: user_id}, (err,data) => {
    console.log(data);
    if(err){
      console.log(err)
    }
    else{
      var did = data.doctorId;
      // Doctor.findOne({id:did}, (err,data1) => {
      //   if(err){
      //     console.log(err)
      //   }
      //   else{
      //     console.log(data1)
      //     // sendData['first'] = data1.name;
      //     // console.log(sendData)
      //     res.send({
      //       'first':data1.name,
      //       'data': data
      //     })
      //   }
      // })
      res.send(data)
    }
  })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
