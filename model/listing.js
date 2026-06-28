const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        url: String,
        filename: String,
    },

    price: Number,

    location: String,

    country: String,

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    // ✅ Geometry should be here
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [73.8567, 18.5204],
        },
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});
  



listingSchema.post("findOneDelete",async(listing)=>{
  if (listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});
  }
});

const Listing =mongoose.model("Listing", listingSchema);
module.exports=Listing;