const express = require("express");
const Person = require("../models/person");

const router = express.Router();
const checkAuth = require("../middleware/check-auth")
router.post("",
  // checkAuth,
  (req, res, next) => {

    const person = new Person({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      avatar: req.body.avatar,
      address: req.body.address,
      country: req.body.country,
      countryLagLat: req.body.countryLagLat,
      // creator: req.userData.userId
    });
    person.save().then(createdPerson => {
      res.status(201).json({
        message: 'Person added successfully',
        person: {
          ...createdPerson,
          // id: createdPerson._id
        }
      });
    })

  });

router.get("", (req, res, next) => {
  Person.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      posts: documents
    });
  });

});

router.patch("/:id",
  // checkAuth,
  (req, res, next) => {
    const person = new Person({
      _id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      avatar: req.body.avatar,
      address: req.body.address,
      country: req.body.country,
      countryLagLat: req.body.countryLagLat,
      // creator: req.userData.userId,
    });
    Person.updateOne({ _id: req.params.id }, { $set: person }).then(result => {
      // Person.updateOne({ _id: req.params.id, creator: req.userData.userId }, { $set: person }).then(result => {
      console.log(result);
      console.log(person);
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
  })

module.exports = router;
