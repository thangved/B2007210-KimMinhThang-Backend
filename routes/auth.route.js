const { Router } = require("express");
const {
	register,
	login,
	auth,
} = require("~/controllers/auth.controller");
const AuthMiddleware = require("~/middleware/auth.middleware");

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(AuthMiddleware, auth);

module.exports = router;
