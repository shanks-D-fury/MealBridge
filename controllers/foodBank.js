const Product = require("../models/product.js");
const FoodBank = require("../models/foodBank.js");
const Package = require("../models/package.js");

module.exports.fbPage = (req, res) => {
	res.render("elements/fb.ejs");
};

module.exports.fbInfo = async (req, res) => {
	let fb = new FoodBank(req.body.foodBank);
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
		const { products } = req.body;
		const parsedProducts =
			typeof products === "string" ? JSON.parse(products) : products;

		const createdProducts = await Product.insertMany(
			parsedProducts.map((product) => ({
				itemName: product.itemName,
				quantity: product.quantity,
				expireDate: product.expireDate,
			}))
		);

		const productIds = createdProducts.map((product) => product._id);
		const newPackage = new Package({ donar: req.user._id });
		newPackage.products.push(...productIds);
		await newPackage.save();

		req.flash("success", "Products added successfully!");
		res.redirect("/dashboard"); // Redirect to another page
	} catch (err) {
		next(err);
	}
};

module.exports.inventory = async (req, res) => {
	const foodbanks = await FoodBank.find({}).populate({ path: "products" });
	res.render("elements/inventory.ejs", { foodbanks });
};

module.exports.dashboard = (req, res) => {
	res.render("elements/dashboard.ejs");
};

module.exports.recievePage = async (req, res) => {
	const foodbanks = await FoodBank.find({}).populate({ path: "products" });
	res.render("elements/recieve.ejs", { foodbanks });
};

module.exports.fertilizerPage = async (req, res) => {
	const foodbanks = await FoodBank.find({}).populate({ path: "products" });
	res.render("elements/fertilizer.ejs", { foodbanks });
};

module.exports.acceptDonation = async (req, res, next) => {
	try {
		let { id } = req.params;
		const result = await FoodBank.findByIdAndUpdate(id, {
			$set: { accepted: true },
		});
		req.flash("success", "Donation accepted successfully!");
		res.redirect("/foodbank");
	} catch (err) {
		next(err);
	}
};

module.exports.deleteDonation = async (req, res, next) => {
	try {
		let { id } = req.params;
		const foodBank = await FoodBank.findById(id);
		if (!foodBank) {
			return req.flash("error", "no foodbank found");
		}
		const result = await Product.deleteMany({
			_id: { $in: foodBank.products },
		});
		foodBank.products = [];
		foodBank.accepted = false;
		await foodBank.save();
		req.flash("success", "ThankYou for receving !");
		res.redirect("/dashboard");
	} catch (err) {
		next(err);
	}
};
