const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;