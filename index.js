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

app.get("/activity-groups/:id", Controller.getDetailActivity);

app.patch("/activity-groups/:id", Controller.updateActivity);

app.delete("/activity-groups/:id", Controller.deleteActivity);

// ! Todo Routes

app.post("/todo-items", Controller.createTodo);
app.get("/todo-items", Controller.getAllTodos);
app.get("/todo-items/:id", Controller.getDetailTodo);
app.patch("/todo-items/:id", Controller.updateTodo);
app.delete("/todo-items/:id", Controller.deleteTodo);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
