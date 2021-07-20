const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const app = express();
const postsRoutes = require("./routes/postPerson");
const userRoutes = require("./routes/user")
mongoose
  .connect("mongodb+srv://sanjaykumar:hM4hV1DmpiYbRnC6@cluster0.q7mrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    // .connect("mongodb+srv://sanjaykumar:hM4hV1DmpiYbRnC6@cluster0.q7mrx.mongodb.net/myFirstDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
//

app.use("/api/person", postsRoutes)
app.use("/api/user", userRoutes)


module.exports = app;
