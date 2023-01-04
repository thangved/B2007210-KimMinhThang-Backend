const jwt = require("jsonwebtoken");

const configs = require("~/configs");

const jwtUtil = {
	sign(data) {
		return jwt.sign(data, configs.server.jwtSecret);
	},

	decode(token) {
		return jwt.decode(token, configs.server.jwtSecret);
	},
};

module.exports = jwtUtil;
