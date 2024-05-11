const { Router } = require("express");
const { Todo } = require("../../db");
const { route } = require("./admin");
const { createTodo } = require("../types");

const router = Router();

router.post("/create-todo", (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);

  if (!parsePayload.success) {
    res.status(411).json({ msg: "You sent the wrong inputs" });
    return;
  }

  
});

route.get("/todos", (req, res) => {});

router.put("/completed", (req, res) => {});
