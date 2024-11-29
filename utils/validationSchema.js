const Joi = require("joi");

module.exports.foodBankSchema = Joi.object({
	FoodBank: Joi.object({
		title: Joi.string().required(),
		location: Joi.string().required(),
		country: Joi.string().required(),
	}).required(),
});

module.exports.productSchema = Joi.object({
	Product: Joi.object({
		itemName: Joi.string().required(),
		quantity: Joi.string().required(),
		exprireDate: Joi.date().required(),
	}).required(),
});
