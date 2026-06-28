const Listing = require("../model/listing");

// ================= INDEX =================
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

// ================= NEW FORM =================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// ================= SHOW =================
module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        });

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};

// ================= CREATE =================
module.exports.createListing = async (req, res) => {

    const listing = new Listing(req.body.listing);

    listing.owner = req.user._id;

    listing.image = {
        url: req.file.path,
        filename: req.file.filename,
    };

    await listing.save();

    req.flash("success", "Listing Created!");

    res.redirect("/listings");
};

// ================= EDIT FORM =================
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/edit", { listing });
};

// ================= UPDATE =================
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
    });

    req.flash("success", "Listing Updated Successfully!");

    res.redirect(`/listings/${id}`);
};

// ================= DELETE =================
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted Successfully!");

    res.redirect("/listings");
};