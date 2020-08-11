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
                sec: { type: Number },
                activity: {type: String},
            },

        ],
        days_notes: { type: String, default: "Record Notes on Todays Activities" },
        petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

sessionSchema.virtual("total_sec").get(function () {
    return this.training_block.reduce((total, training_block) => {
        return total + training_block.sec
    }, 0);
})

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;