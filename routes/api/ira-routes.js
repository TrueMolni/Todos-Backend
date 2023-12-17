const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/ira-controllers");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/ira");

router.get("/", ctrl.getAllTodos);

router.post("/", validateBody(schemas.addSchema), ctrl.addMyTodo);

router.put("/:id", ctrl.updateCompleted);

router.patch("/toggleall", ctrl.updateAll);

router.delete("/:id", ctrl.deleteTodo);

module.exports = router;
