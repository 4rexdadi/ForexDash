// Imports statements axios, express, mongoose, cors
const express = require("express");
const app = express();
const axios = require("axios");
const mongoose = require("mongoose");
const { config } = require("dotenv");
config();

// cors are require for the connection from the clients side otherwise app will crash
const cors = require("cors");
app.use(express.json());
app.use(cors());

// import Models
const SessionModel = require("./models/Session");

// mongo db connection taking in db username and password
mongoose.connect(process.env.DB_URI);

// using axios to run a post request to the connection post request sever
const getSession = (user, res) => {
  const password = user.password;
  const email = user.email;

  axios
    .get(
      `https://www.myfxbook.com/api/login.json?email=${email}&password=${password}`
    )
    .then((response) => {
      if (response.data.error) {
        res.json(response.data);
      } else {
        userSession = response.data;

        const newUserSession = new SessionModel(userSession);
        newUserSession.save();

        res.json(userSession);
      }
    })
    .catch((error) => console.log(error));
};

app.post("/api/getSession", async (req, res) => {
  const user = req.body;

  getSession(user, res);
});

app.delete("/api/deleteSession/:session", (req, res) => {
  SessionModel.deleteMany({ session: req.params.session }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        error: false,
        message: `This userSession has been deleted ${req.params.session}`,
        session: req.params.session,
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
