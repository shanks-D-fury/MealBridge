const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodBankSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	location: String,
	country: String,
});

module.exports = mongoose.model("FoodBank", foodBankSchema);
