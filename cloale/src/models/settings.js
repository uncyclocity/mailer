const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const setting = new Schema({
  _id: Schema.Types.ObjectId,

  isRunServer: Boolean,

  URL: String,

  receiver: [
    {
      name: String,
      email: String,
    },
  ],
});

module.exports = mongoose.model("Setting", setting);
