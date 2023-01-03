const { default: mongoose } = require("mongoose");

const configs = require("~/configs");

mongoose.set("strictQuery", true);

const dbService = {
	async connect() {
		try {
			const connection = await mongoose.connect(
				configs.db.uri
			);
			console.log(
				"[ DB Service ] Connected to mongodb!"
			);
			return connection;
		} catch (error) {
			throw new Error(
				"[ DB Service ] " + error.toString()
			);
		}
	},

	async disconnect() {
		await mongoose.disconnect();
	},
};

module.exports = dbService;
