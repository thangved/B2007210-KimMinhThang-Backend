const server = {
	port: process.env.PORT || 5000,
	corsOrigin: process.env.CORS_ORIGIN || "*",
	jwtSecret:
		process.env.JWT_SECRET || "Set this value in .env",
};

module.exports = server;
