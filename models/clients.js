const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("./pets");

clientSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    source: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

clientSchema.pre('remove', async function (next) {
  try {
    await db.find({ clientId: { $in: this.id } })
    .then(items => { items.forEach(item => item.remove() )})
    .then(next())
  } catch (err) {
    console.log(err)
    next(err)
  }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;