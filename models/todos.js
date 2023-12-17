const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const todosSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Set text for todo"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

todosSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  text: Joi.string().required().messages({
    "any.required": `"text" is required`,
    "string.empty": `"text" cannot be empty`,
  }),
  completed: Joi.boolean().messages({
    "completed.empty": `"completed" cannot be empty`,
    "completed.base": `"completed" must be boolean`,
  }),
});

const updateCompletedSchema = Joi.object({
  completed: Joi.boolean().required().messages({
    "any.required": `missing field "completed"`,
    "completed.empty": `"completed" cannot be empty`,
    "completed.base": `"completed" must be boolean`,
  }),
});

const schemas = {
  addSchema,
  updateCompletedSchema,
};

const Todo = model("todo", todosSchema);

module.exports = {
  Todo,
  schemas,
};
