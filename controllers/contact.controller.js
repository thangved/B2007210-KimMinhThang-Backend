const contactModel = require("~/models/contact.model");

class ContactController {
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async create(req, res) {
		try {
			const newContact = await contactModel.create(
				req.body
			);

			res.status(201).send(newContact.toObject());
		} catch (error) {
			res.status(400).send({
				message: error.message,
			});
		}
	}

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async getAll(req, res) {
		try {
			const contacts = await contactModel.find({});
			res.send(contacts.map((e) => e.toObject()));
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	}

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async deleteAll(req, res) {
		try {
			await contactModel.deleteMany({});
			res.status(200).end();
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	}

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async getAllFavorites(req, res) {
		try {
			const contacts = await contactModel.find({
				favorite: true,
			});
			res.send(contacts.map((e) => e.toObject()));
		} catch (error) {
			res.status(500).send({
				message: error.message,
			});
		}
	}

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async getById(req, res) {
		try {
			const contact = await contactModel.findById(
				req.params.id
			);
			res.send(contact.toObject());
		} catch (error) {
			res.status(400).send({
				message: error.message,
			});
		}
	}

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async updateById(req, res) {
		try {
			await contactModel.findByIdAndUpdate(
				req.params.id,
				req.body
			);
			res.status(200).end();
		} catch (error) {
			res.status(400).send({
				message: error.message,
			});
		}
	}

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async deleteById(req, res) {
		try {
			await contactModel.findByIdAndDelete(
				req.params.id
			);
			res.status(200).end();
		} catch (error) {
			res.status(400).send({
				message: error.message,
			});
		}
	}
}

module.exports = new ContactController();
