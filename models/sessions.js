const mongoose = require("mongoose");
const Schema = mongoose.Schema;

sessionSchema = new Schema(
    {
        day: { type: Date, required: true },
        training_block: {
            block_notes: { type: [String] },
            start_time: { type: [String] },
            end_time: { type: [String] },
        },
        days_notes: { type: String },
        petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    },
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;