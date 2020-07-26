const mongoose = require("mongoose");
const Schema = mongoose.Schema;

sessionSchema = new Schema(
    {
        day: { type: Date, required: true },
        training_block: [
            {
                start: { type: String },
                session_notes: { type: String },
                end: { type: String },
            },
           
        ],
        days_notes: { type: String, default: "Record Notes on Todays Activities" },
        petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    },
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;