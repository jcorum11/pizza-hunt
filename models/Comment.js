const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReplySchema = new Schema(
  {
    replyBody: {
      type: String,
      required: true,
      trim: true,
    },
    writtenBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  { toJSON: { getters: true } }
);

const CommentSchema = new Schema(
  {
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    writtenBy: {
      type: String,
      required: true,
      trim: true,
    },
    commentBody: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    replies: [ReplySchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

CommentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
