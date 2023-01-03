const server = {
	port: process.env.PORT || 5000,
	corsOrigin: process.env.CORS_ORIGIN || "*",
};

module.exports = server;
