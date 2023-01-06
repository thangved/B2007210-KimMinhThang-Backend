const { Router } = require("express");
const {
	create,
	getAll,
	deleteAll,
	getAllFavorites,
	getById,
	deleteById,
	updateById,
} = require("~/controllers/contact.controller");
const AuthMiddleware = require("~/middleware/auth.middleware");

const router = Router();

router
	.route("/")
	.post(AuthMiddleware, create)
	.get(AuthMiddleware, getAll)
	.delete(AuthMiddleware, deleteAll);

router
	.route("/favorites")
	.get(AuthMiddleware, getAllFavorites);

router
	.route("/:id")
	.get(AuthMiddleware, getById)
	.put(AuthMiddleware, updateById)
	.delete(AuthMiddleware, deleteById);

module.exports = router;
