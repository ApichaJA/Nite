const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    nid: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      uuid: {
        type: String,
        require: true,
      },
      firstname: {
        type: String,
        require: true,
      },
      lastname: {
        type: String,
        require: true,
      }
    },

  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
