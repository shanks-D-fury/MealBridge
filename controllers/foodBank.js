const Product = require("../models/product.js");
const FoodBank = require("../models/foodBank.js");

module.exports.fbPage = (req, res) => {
	res.render("elements/fb.ejs");
};

module.exports.fbInfo = async (req, res) => {
	// let { location, country } = req.body.foodBank;
	// const geometry = await Map_coordinates(location, country);
	let fb = new FoodBank(req.body.foodBank);
	// fb.geometry = geometry;
	await fb.save();
	req.flash("success", "New foodBank Succesfully Created");
	res.redirect("/dashboard");
};

module.exports.donatePage = async (req, res, next) => {
	const foodbanks = await FoodBank.find({});
	res.render("elements/donar.ejs", { foodbanks });
};

module.exports.donateInfo = async (req, res, next) => {
	try {
		const { fbId, products } = req.body;
		const parsedProducts =
			typeof products === "string" ? JSON.parse(products) : products;

		const createdProducts = await Product.insertMany(
			parsedProducts.map((product) => ({
				itemName: product.itemName,
				quantity: product.quantity,
				expireDate: product.expireDate,
				donar: req.user._id,
			}))
		);

		const productIds = createdProducts.map((product) => product._id);
		const foodBank = await FoodBank.findById(fbId);

		if (!foodBank) throw new Error("FoodBank not found!");

		foodBank.products.push(...productIds);
		await foodBank.save();

		req.flash("success", "Products added successfully!");
		res.redirect("/dashboard"); // Redirect to another page
	} catch (err) {
		next(err);
	}
};
