const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ✅ FIXED IMPORT
const passportLocalMongoose = require("passport-local-mongoose").default || require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// ✅ NOW THIS WILL WORK
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);