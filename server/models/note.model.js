import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      trim: true,
      default: "todo",
    },
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    color: {
      type: String,
      default: "#FFFFFF", 
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model("Note", noteSchema);

export default Note;
