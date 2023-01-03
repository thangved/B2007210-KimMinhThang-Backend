const { Router } = require("express");

const router = Router();

router.use("/contacts", require("./contact.route"));

module.exports = router;
