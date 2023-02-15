const ApiError = require("~/api-error");
const contactModel = require("~/models/contact.model");

class ContactController {
	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import("express").NextFunction} next
	 */
	async create(req, res, next) {
		try {
			const newContact = await contactModel.create({
				...req.body,
				createdBy: req.currentUser._id,
			});

			res.status(201).send(newContact.toObject());
		} catch (error) {
			next(new ApiError(400, error.message));
		}
	}

	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import("express").NextFunction} next
	 */
	async getAll(req, res, next) {
		try {
			const contacts = await contactModel.find({
				createdBy: req.currentUser._id,
			});
			res.send(contacts.map((e) => e.toObject()));
		} catch (error) {
			next(new ApiError(500, error.message));
		}
	}

	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import("express").NextFunction} next
	 */
	async deleteAll(req, res, next) {
		try {
			await contactModel.deleteMany({
				createdBy: req.currentUser._id,
			});
			res.status(200).end();
		} catch (error) {
			next(new ApiError(500, error.message));
		}
	}

	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import("express").NextFunction} next
	 */
	async getAllFavorites(req, res, next) {
		try {
			const contacts = await contactModel.find({
				favorite: true,
				createdBy: req.currentUser._id,
			});
			res.send(contacts.map((e) => e.toObject()));
		} catch (error) {
			next(new ApiError(500, error.message));
		}
	}

	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import("express").NextFunction} next
	 */
	async getById(req, res, next) {
		try {
			const contact = await contactModel.findOne({
				_id: req.params.id,
				createdBy: req.currentUser._id,
			});
			res.send(contact.toObject());
		} catch (error) {
			next(new ApiError(400, error.message));
		}
	}

	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import("express").NextFunction} next
	 */
	async updateById(req, res, next) {
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
			next(new ApiError(400, error.message));
		}
	}

	/**
	 *
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import("express").NextFunction} next
	 */
	async deleteById(req, res, next) {
		try {
			await contactModel.findByIdAndDelete({
				_id: req.params.id,
				createdBy: req.currentUser._id,
			});
			res.status(200).end();
		} catch (error) {
			next(new ApiError(400, error.message));
		}
	}
}

module.exports = new ContactController();
