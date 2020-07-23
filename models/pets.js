const mongoose = require("mongoose");
const Schema = mongoose.Schema;

petSchema = new Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    program: { type: String, required: true },
    start_date: { type: String, required: true },
    issues: { type: String, required: true },
    notes: { type: String },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  },
  {
    timestamps: true
  }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
