const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const { secretPassowrd } = require("../keys");
const router = Router();

router.post("/signup", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  User.findOne({ username: username, password: password }).then((value) => {
    if (value) {
      res.status(404).json({ msg: "User Already exist with this username" });
    } else {
      User.create({ username: username, password: password });
      jwt.sign(username, "jwt-secret-password", (err, token) => {
        if (err) {
          console.log(err);
        }
        res.send(token);
      });
    }
  });
});

// eyJhbGciOiJIUzI1NiJ9.YWJoaXJhanNpbmg.KscKixkUjeIEaHU8w7swPtuuSAwOUzmpGJPk9CUkJdk
router.post("/signin", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  User.findOne({ username: username, password: password }).then((value) => {
    if (!value) {
      res.send("User not found");
    } else {
      jwt.verify(req.headers.authorization, "jwt-secret-password", (err, authorizedData) => {
        if (err) {
          //If error send Forbidden (403)
          console.log("ERROR: Could not connect to the protected route");
          res.sendStatus(403);
        } else {
          //If token is successfully verified, we can send the autorized data
          res.json({
            message: "Successful log in",
            authorizedData,
          });
          console.log("SUCCESS: Connected to protected route");
        }
      });
    }
  });
});

module.exports = router;
