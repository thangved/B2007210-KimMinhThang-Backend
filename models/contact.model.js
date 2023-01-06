const { Schema, model } = require("mongoose");

const validatorUtil = require("~/utils/validators.util");

const ContactModel = new Schema(
	{
		name: {
			type: String,
			required: [true, "Tên liên hệ là bắt buộc"],
		},
		email: {
			type: String,
			validate: {
				validator: validatorUtil.email,
				message: "Địa chỉ email không hợp lệ",
			},
		},
		address: { type: String },
		phone: {
			type: String,
			validate: {
				validator: validatorUtil.phone,
				message: "Số điện thoại không hợp lệ",
			},
		},
		favorite: { type: Boolean, default: false },
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = model("contacts", ContactModel);
