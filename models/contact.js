const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../decorator");
const { error } = require("console");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
  // { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.require": `"name" is required`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const upDateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "string.empty": "missing field favorite" }),
});

const schemas = {
  addSchema,
  upDateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
