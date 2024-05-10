const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://abhirajsinha25:AbhirajMongodb@cluster0.7dglxng.mongodb.net/todo-app"
);

const AdminSchema = new mongoose.Schema({
  // define schema
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // define schema
  username: String,
  password: String,

  todos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Todo",
    },
  ],
});

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  Admin,
  User,
  Todo,
};
