const mongoose = require("mongoose");
const Schema = mongoose.Schema;

petSchema = new Schema({
  day: { type: [Date], default: Date.now },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  currentWeight: { type: [Number], required: true },
  idealWeight: { type: Number, required: true },
  mealsPerDay: { type: Number, required: true },
  clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
