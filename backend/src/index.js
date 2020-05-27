const express = require("express");
const routes = require("./routes");
const axios = require("axios");
const schedule = require("node-schedule");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);
app.listen(3333);

var j = schedule.scheduleJob("0 11 * * *", function () {
  axios
    .post("http://localhost:3333/resetvotes")
    .then((response) => {
      console.log(response.data.url);
      console.log(response.data.explanation);
    })
    .catch((error) => {
      console.log(error);
    });
});

var g = schedule.scheduleJob("* * * * 7", function () {
  axios
    .post("http://localhost:3333/resetplaces")
    .then((response) => {
      console.log(response.data.url);
      console.log(response.data.explanation);
    })
    .catch((error) => {
      console.log(error);
    });
});
