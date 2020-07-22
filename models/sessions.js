const mongoose = require("mongoose");
const Schema = mongoose.Schema;

sessionSchema = new Schema(
    {
        day: { type: [Date] },
        training_block: { type: [String] },
        days_notes: { type: String },
        start_time: { type: String },
        end_time: { type: String },
        PetId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    },
    {
        timestamps: true
    }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;