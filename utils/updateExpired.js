const mongoose = require("mongoose");
const Product = require("../models/product.js"); // Adjust the path to your Product schema

async function markExpiredProducts() {
	try {
		const now = new Date();

		// Update products where `expireDate` has passed and `expired` is false
		const result = await Product.updateMany(
			{ expireDate: { $lt: now }, expired: false },
			{ $set: { expired: true } }
		);
		console.log(`${result.modifiedCount} products marked as expired.`);
		return result;
	} catch (err) {
		console.error("Error marking expired products:", err);
		throw err;
	}
}
