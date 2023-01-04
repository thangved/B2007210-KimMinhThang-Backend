const { Router } = require("express");

const router = Router();

router.use("/contacts", require("./contact.route"));
router.use("/auth", require("./auth.route"));

module.exports = router;
