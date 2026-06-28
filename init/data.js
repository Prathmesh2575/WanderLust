const mongoose = require("mongoose");
const Listing = require("../model/listing.js"); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
    initDB();
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const sampleListings = [
  {
    title: "Beach House Goa",
    description: "Beautiful beach house near Calangute",
    price: 2500,
    location: "Goa",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", filename: "img1" }
  },
  {
    title: "Mountain Cabin",
    description: "Cozy cabin in the mountains",
    price: 1800,
    location: "Manali",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800", filename: "img2" }
  },
  {
    title: "Luxury Villa",
    description: "Premium villa with pool",
    price: 5000,
    location: "Mumbai",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800", filename: "img3" }
  },
  {
    title: "Desert Camp",
    description: "Stay in desert camp",
    price: 1500,
    location: "Jaisalmer",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800", filename: "img4" }
  },
  {
    title: "City Apartment",
    description: "Modern apartment in city center",
    price: 3000,
    location: "Pune",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", filename: "img5" }
  },
  {
    title: "Lake View Cottage",
    description: "Cottage with lake view",
    price: 2200,
    location: "Udaipur",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800", filename: "img6" }
  },
  {
    title: "Forest Retreat",
    description: "Peaceful forest stay",
    price: 1700,
    location: "Kerala",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800", filename: "img7" }
  },
  {
    title: "Hill Station Hotel",
    description: "Cool climate hotel",
    price: 2000,
    location: "Shimla",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800", filename: "img8" }
  },
  {
    title: "Farmhouse Stay",
    description: "Relax in farmhouse",
    price: 1200,
    location: "Nashik",
    country: "India",
    image: { url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800", filename: "img9" }
  },
  {
    title: "Resort Stay",
    description: "Luxury resort stay",
    price: 4000,
    location: "Bali",
    country: "Indonesia",
    image: { url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d0?w=800", filename: "img10" }
  }
];

const ownerId = new mongoose.Types.ObjectId("6a3d12531ea1b5f2a63d159c");

async function initDB() {

  await Listing.deleteMany({});

  const listingsWithOwner = sampleListings.map((listing) => ({
    ...listing,
    owner: ownerId,
  }));

  await Listing.insertMany(listingsWithOwner);

  console.log("Sample data inserted!");
}