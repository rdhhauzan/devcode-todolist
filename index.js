const express = require("express");
const app = express();
const cors = require("cors");
const Controller = require("./controller/controller");
const PORT = process.env.PORT || 3030;

require("dotenv").config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ! Activity Routes
app.post("/activity-groups", Controller.createActivity);

app.get("/activity-groups", Controller.getAllActivities);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
