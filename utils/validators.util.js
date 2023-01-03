const validatorUtil = {
	phone(value) {
		return !!parseInt(value);
	},
	email(value) {
		return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
			value
		);
	},
};

module.exports = validatorUtil;
