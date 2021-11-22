const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  account:{
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      require: true
    },
  },
  profile: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  role:{
    type: String,
    required: true,
  }
}, { timestamps: true });

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
