const express = require("express");
const router = express.Router();
const AsyncWrap = require("../utils/AsyncWrap.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/Middlewares.js");
const userControllers = require("../controllers/user.js");

//signup routes
router
	.route("/signup")
	.get(userControllers.signUpFormRender)
	.post(AsyncWrap(userControllers.signUp));

//login routes
router
	.route("/login")
	.get(userControllers.loginFormRender)
	.post(
		saveRedirectUrl,
		passport.authenticate("local", {
			successRedirect: "/dashboard",
			failureRedirect: "/",
			failureFlash: true,
		}),
		AsyncWrap(userControllers.login)
	);

router.get("/logout", userControllers.logout);

module.exports = router;
