const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configs = require("~/configs");

const server = express();

server.use(bodyParser.json());
server.use(
	cors({
		origin: configs.server.corsOrigin,
		optionsSuccessStatus: 200,
	})
);

server.use("/api", require("~/routes"));

module.exports = server;
