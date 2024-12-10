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
			ref: "Product",
		},
	],
});

module.exports = mongoose.model("FoodBank", foodBankSchema);
