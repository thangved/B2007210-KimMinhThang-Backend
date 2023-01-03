const db = {
	uri:
		process.env.MONGODB_URI ||
		"mongodb://localhost:27017/contact_book",
};

module.exports = db;
