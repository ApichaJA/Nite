const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
    uuid: {
      type: String,
      require: true
    },
    nid: {
      type: String,
      require: true
    },
}, { timestamps: true });

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
