const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const mongo_url = "mongodb://127.0.0.1:27017/MealBridge";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
	.then(() => {
		console.log("Mongo DB Connection Successful");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(mongo_url);
}

//home route
app.get("/", (req, res) => {
	res.send("hello MealBridge");
});

app.listen(8080, () => {
	console.log("ComfortNest Listening {Port: 8080}");
});
