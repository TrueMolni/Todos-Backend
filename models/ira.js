const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const iraTodosSchema = new Schema(
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

iraTodosSchema.post("save", handleMongooseError);

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

const IraTodo = model("iraTodo", iraTodosSchema);

module.exports = {
  IraTodo,
  schemas,
};
