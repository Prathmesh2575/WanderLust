const Listing = require("../model/listing");
const Review = require("../model/review");

// ================= CREATE REVIEW =================
module.exports.createReview = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    const review = new Review(req.body.review);

    // Save logged-in user as review author
    review.author = req.user._id;

    // Add review to listing
    listing.reviews.push(review);

    await review.save();
    await listing.save();

    req.flash("success", "Review Added Successfully!");

    res.redirect(`/listings/${id}`);
};

// ================= DELETE REVIEW =================
module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review from listing
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId },
    });

    // Delete review
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted Successfully!");

    res.redirect(`/listings/${id}`);
};