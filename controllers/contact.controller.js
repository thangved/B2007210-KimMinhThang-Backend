const contactModel = require("~/models/contact.model");

class ContactController {
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	async create(req, res) {
		try {
			const newContact = await contactModel.create({
				...req.body,
				createdBy: req.currentUser._id,
			});

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
			const contacts = await contactModel.find({
				createdBy: req.currentUser._id,
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
	async deleteAll(req, res) {
		try {
			await contactModel.deleteMany({
				createdBy: req.currentUser._id,
			});
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
				createdBy: req.currentUser._id,
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
			const contact = await contactModel.findOne({
				_id: req.params.id,
				createdBy: req.currentUser._id,
			});
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
			await contactModel.findOneAndUpdate(
				{
					_id: req.params.id,
					createdBy: req.currentUser._id,
				},
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
			await contactModel.findByIdAndDelete({
				_id: req.params.id,
				createdBy: req.currentUser._id,
			});
			res.status(200).end();
		} catch (error) {
			res.status(400).send({
				message: error.message,
			});
		}
	}
}

module.exports = new ContactController();
