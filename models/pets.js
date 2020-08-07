const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("./sessions");

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

petSchema.pre('remove', async function (next) {
  try {
    await db.find({ petId: { $in: this.id } })
      .then(items => { items.forEach(item => item.remove()) })
      .then(next())
  } catch (err) {
    console.log(err)
    next(err)
  }
})

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
