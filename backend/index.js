const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log("Server listening on port: ", port);
});
