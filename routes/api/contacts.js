const express = require("express");

const ctrl = require("../../controlers/contacts_ctrl");
const { authenticate } = require("../../middlewares");
const { validateBody } = require("../../decorator/");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:id", authenticate, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:id", authenticate, ctrl.deleteById);

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateById
);
router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.upDateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
