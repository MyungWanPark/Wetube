import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  text: { type: String, required: true },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
