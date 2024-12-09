const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
	donar: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	],
	accepted: { type: Boolean, default: false },
	geometry: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
});

module.exports = mongoose.model("Package", packageSchema);
