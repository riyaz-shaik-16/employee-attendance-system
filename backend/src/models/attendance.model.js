import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    date: { type: String, required: true }, // store YYYY-MM-DD

    checkIn: { type: Date },
    checkOut: { type: Date },

    status: {
      type: String,
      enum: ["present", "absent", "late", "half-day"],
      default: "present"
    },

    totalHours: { type: Number, default: 0 }
  },
  { timestamps: true }
);

attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
