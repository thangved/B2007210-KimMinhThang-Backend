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

const router = Router();

router
	.route("/")
	.post(create)
	.get(getAll)
	.delete(deleteAll);

router.route("/favorites").get(getAllFavorites);

router
	.route("/:id")
	.get(getById)
	.put(updateById)
	.delete(deleteById);

module.exports = router;
