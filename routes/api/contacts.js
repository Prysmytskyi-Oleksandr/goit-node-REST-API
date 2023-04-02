const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.require": `"name" is required`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.getAllContacts();
    res.json(result);
  } catch (error) {
    next(error);

    // res.status(500).json({
    //   message: error.message,
    // });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
      // const error = new Error(`Contact with ${id} not found`);
      // error.status = 404;
      // throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);

    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message,
    // });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contacts.deleteById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    // res.status(200).json({
    //   message: "contact deleted",
    // });
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
      // throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
