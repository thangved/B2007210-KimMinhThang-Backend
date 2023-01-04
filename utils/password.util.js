const bcrypt = require("bcrypt");

const passwordUtil = {
	async hash(password) {
		return bcrypt.hash(password, 10);
	},
	async compare(password, hash) {
		return await bcrypt.compare(password, hash);
	},
};

module.exports = passwordUtil;
