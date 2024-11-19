const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	phone_no: {
		type: Number,
		required: true,
	},
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);