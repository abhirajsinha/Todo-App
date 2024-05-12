const { Router } = require("express");
const { Todo } = require("../../db");
const { route } = require("./admin");
const { createTodo } = require("../types");

const router = Router();

router.post("/create-todo", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);

  if (!parsePayload.success) {
    res.status(411).json({ msg: "You sent the wrong inputs" });
    return;
  }

   await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.send("Todo Created");
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

router.put("/completed", (req, res) => {
  const updatePyalod = req.body;
  const parsePayload = updatePyalod.safeParse(updatePyalod);

  if (!parsePayload.success) {
    res.status(404).send("You send the wrong inputs for update");
  }

  Todo.updateOne({ _id: updatePyalod.id }, { completed: true }).then(
    (value) => {
      if (value) {
        res.send("Todo Update Completed");
      }
    }
  );
});

module.exports = router