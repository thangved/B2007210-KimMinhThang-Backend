require("module-alias/register");

const configs = require("~/configs");
const server = require("~/server");
const dbService = require("~/services/db.service");

const startServer = async () => {
	await dbService.connect();

	server.listen(configs.server.port, () => {
		console.log(
			`Server run on http://localhost:${configs.server.port}`
		);
	});
};

startServer();
