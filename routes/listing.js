const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");

const listingController = require("../controllers/listings");

const { isLoggedIn, isOwner } = require("../middleware");

const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });



// ================= VALIDATION =================
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    next();
};

// ================= ROUTES =================

// Index
router.get("/", wrapAsync(listingController.index));

// New Form
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
);

// Show
router.get(
    "/:id",
    wrapAsync(listingController.showListing)
);

// Create
router.post(
    "/",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);
// Edit Form
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

// Update
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
);

// Delete
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);

module.exports = router;