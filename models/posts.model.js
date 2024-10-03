const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  creator: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  location: {
    type: String,
    required: false,
  },
  caption: {
    type: String,
    required: false,
  },
  tags: {
    tag: {
      type: String,
    },
  },
  likes: {
    counts: {
      type: Number,
    },
  },
});

PostSchema.statics.protectedFields = ["_id", "__v"];
module.exports = module.exports("posts", PostSchema);
