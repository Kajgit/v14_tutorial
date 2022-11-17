const { model, Schema } = require("mongoose");

let logSchema = new Schema({
    Guild: String,
    Channel: String,
});

module.exports = model("Logs", logSchema);