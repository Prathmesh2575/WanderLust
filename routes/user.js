const express = require("express");
const router = express.Router();

const passport = require("passport");

const userController = require("../controllers/user");

const { saveRedirectUrl } = require("../middleware");

// Signup Form
router.get(
    "/signup",
    userController.renderSignupForm
);

// Signup
router.post(
    "/signup",
    userController.signup
);

// Login Form
router.get(
    "/login",
    userController.renderLoginForm
);

// Login
router.post(
    "/login",
    saveRedirectUrl,

    passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: true,
    }),

    userController.login
);

// Logout
router.get(
    "/logout",
    userController.logout
);

module.exports = router;