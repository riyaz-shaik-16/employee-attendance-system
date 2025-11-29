import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["employee", "manager"],
      required: true,
      default: "employee"
    },

    employeeId: { type: String, unique: true }, // EMP001-style
    department: String
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
