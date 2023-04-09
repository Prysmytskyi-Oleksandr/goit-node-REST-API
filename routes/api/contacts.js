const express = require("express");

const ctrl = require("../../controlers/contacts_ctrl");

const { validateBody } = require("../../decorator/");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.deleteById);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateById);
router.patch(
  "/:id/favorite",
  validateBody(schemas.upDateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
