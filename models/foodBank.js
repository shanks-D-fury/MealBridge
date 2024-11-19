const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodBankSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	location: String,
	country: String,
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "product",
		},
	],
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

module.exports = mongoose.model("FoodBank", foodBankSchema);
