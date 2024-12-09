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
		const { products, latitude, longitude } = req.body;
		const coordinates = [Number(longitude), Number(latitude)];
		// console.log(coordinates);
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
		const geometry = { coordinates, type: "Point" };
		const newPackage = new Package({ donar: req.user._id, geometry });
		newPackage.products.push(...productIds);
		await newPackage.save();

		req.flash("success", "Products added successfully!");
		res.redirect("/dashboard"); // Redirect to another page
	} catch (err) {
		next(err);
	}
};

module.exports.inventory = async (req, res) => {
	const packages = await Package.find({})
		.populate({ path: "products" })
		.populate({ path: "donar" });
	res.render("elements/inventory.ejs", { packages });
};

module.exports.dashboard = async (req, res) => {
	const foodbanks = await FoodBank.find({});
	res.render("elements/dashboard.ejs", { foodbanks });
};

module.exports.recievePage = async (req, res) => {
	const packages = await Package.find({})
		.populate({ path: "products" })
		.populate({ path: "donar" });
	res.render("elements/recieve.ejs", { packages });
};

module.exports.fertilizerPage = async (req, res) => {
	const foodbanks = await FoodBank.find({})
		.populate({ path: "products" })
		.populate({ path: "donar" });
	res.render("elements/fertilizer.ejs", { foodbanks });
};

module.exports.acceptDonation = async (req, res, next) => {
	try {
		let { id } = req.params;
		const package = await Package.findById(id);
		// const result = await Product.deleteMany({
		// 	_id: { $in: package.products },
		// });
		console.log(package);
		if (!package) {
			return req.flash("error", "no foodbank found");
		}
		req.flash("success", "ThankYou for receving !");
		res.redirect("/dashboard");
	} catch (err) {
		next(err);
	}
};
