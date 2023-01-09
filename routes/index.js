const { Router } = require("express");

const AuthMiddleware = require("~/middleware/auth.middleware");

const router = Router();

router.use(
	"/contacts",
	AuthMiddleware,
	require("./contact.route")
);
router.use("/auth", require("./auth.route"));

module.exports = router;
