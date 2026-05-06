const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  trail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trail",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;