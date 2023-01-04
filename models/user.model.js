const { Schema, model } = require("mongoose");
const validatorUtil = require("~/utils/validators.util");

const UserModel = new Schema(
	{
		username: {
			type: String,
			require: [true, "Tên đăng nhập là bắt buộc"],
			unique: [
				true,
				"Tên đăng nhập này đã được sử dụng",
			],
		},
		email: {
			type: String,
			validate: {
				validator: validatorUtil.email,
				message: "Địa chỉ email không hợp lệ",
			},
		},
		password: { type: String },
	},
	{ timestamps: true }
);

module.exports = model("users", UserModel);
