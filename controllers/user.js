const User = require("../model/user");

// ================= SIGNUP FORM =================
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};

// ================= SIGNUP =================
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            email,
            username,
        });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to WanderLust!");

            res.redirect("/listings");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/users/signup");
    }
};

// ================= LOGIN FORM =================
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

// ================= LOGIN =================
module.exports.login = async (req, res) => {

    req.flash("success", `Welcome back, ${req.user.username}!`);

    let redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
};

// ================= LOGOUT =================
module.exports.logout = (req, res, next) => {

    req.logout((err) => {

        if (err) {
            return next(err);
        }

        req.flash("success", "Logged Out Successfully!");

        res.redirect("/listings");

    });

};