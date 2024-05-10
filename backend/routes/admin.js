const { Router } = require("express");
const { Admin } = require("../../db");
const router = Router();

router.post("/signup", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.findOne({ username: username, password: password }).then((value) => {
    if (value) {
      res.status(404).json({ msg: "User Already exist with this username" });
    } else {
      Admin.create({ username: username, password: password });
      res.send("Admin created Successfully");
    }
  });
});

// router.post("/signin", (req, res) => {
//   const username = req.headers.username;
//   const password = req.headers.password;

// });

module.exports = router;
