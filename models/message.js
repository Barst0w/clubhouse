const mongoose = require("mongoose");
const Schema = mongoose.Schema

const message = mongoose.model(
    "Message",
    new Schema({
      messageTitle: {type: String, required: true},
      messageText: { type: String, required: true },
      messageAuthor: {type: String, required: true}
    })
  );

module.exports = message;