const userModel = require("~/models/user.model");
const jwtUtil = require("~/utils/jwt.util");
const passwordUtil = require("~/utils/password.util");

class AuthController {
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async register(req, res) {
		try {
			const existingUser = await userModel.findOne({
				username: req.body.username,
			});
			if (existingUser)
				throw new Error(
					"Tên người dùng đã được sử dụng"
				);

			const newUser = (
				await userModel.create({
					...req.body,
					password: await passwordUtil.hash(
						req.body.password
					),
				})
			).toObject();

			delete newUser.password;

			res.status(201).send({
				data: newUser,
				accessToken: jwtUtil.sign(newUser),
			});
		} catch (error) {
			res.status(400).send({
				message: error.message,
			});
		}
	}

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async login(req, res) {
		try {
			const username = req.body.username;
			const password = req.body.password;

			const existingUser = await userModel.findOne({
				username,
			});
			if (!existingUser) {
				throw new Error(
					"Tên đăng nhập hoặc mật khẩu không chính xác"
				);
			}

			const isValidPassword =
				await passwordUtil.compare(
					password,
					existingUser.password
				);

			if (!isValidPassword) {
				throw new Error(
					"Tên đăng nhập hoặc mật khẩu không chính xác"
				);
			}

			res.send({
				accessToken: jwtUtil.sign(
					existingUser.toObject()
				),
			});
		} catch (error) {
			res.status(400).send({
				message: error.message,
			});
		}
	}

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async auth(req, res) {
		try {
			res.send({ data: req.currentUser });
		} catch (error) {
			res.status(500).send({
				message: "Internal server error",
			});
		}
	}
}

module.exports = new AuthController();
