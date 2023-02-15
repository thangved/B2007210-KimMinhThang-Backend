const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configs = require("~/configs");
const ApiError = require("./api-error");

const server = express();

server.use(bodyParser.json());
server.use(
	cors({
		origin: configs.server.corsOrigin,
		optionsSuccessStatus: 200,
	})
);

server.use("/api", require("~/routes"));

server.use((req, res, next) => {
	return next(new ApiError(404, "Resource not found"));
});

// eslint-disable-next-line no-unused-vars
server.use((error, req, res, next) => {
	res.status(error.statusCode || 500).send({
		message: error.message || "Internal Server error",
	});
});

module.exports = server;
