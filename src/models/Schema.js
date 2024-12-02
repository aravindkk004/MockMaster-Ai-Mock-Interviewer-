import mongoose from "mongoose";

const MockInterviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  jsonMockResp: {
    type: String,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  jobExperience: {
    type: Number,
    required: true,
  },
  InterviewId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserAnswerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  mockIdRef: {
    type: String,
    required: true,
  },
  question: [String],
  correctAns: [String],
  userAns: [String],
  feedback: [String],
  rating: [Number],
});

const MockInterview =
  mongoose.models.MockInterview ||
  mongoose.model("MockInterview", MockInterviewSchema);
const UserAnswer =
  mongoose.models.UserAnswer || mongoose.model("UserAnswer", UserAnswerSchema);

export { MockInterview, UserAnswer };
