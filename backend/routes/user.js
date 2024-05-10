const { Router } = require("express");
const { User } = require("../../db");
const router = Router();

router.post("/signup", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  User.findOne({ username: username, password: password }).then((value) => {
    if (value) {
      res.status(404).json({ msg: "User Already exist with this username" });
    } else {
      User.create({ username: username, password: password });
      res.send("User created Successfully");
    }
  });
});

module.exports = router;