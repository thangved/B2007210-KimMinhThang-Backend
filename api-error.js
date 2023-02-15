class ApiError extends Error {
	constructor(code, message) {
		super();
		this.statusCode = code;
		this.message = message;
	}
}

module.exports = ApiError;
