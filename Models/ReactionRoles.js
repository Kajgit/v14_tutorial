const { model, Schema } = require("mongoose");

let reactionRoles = new Schema({
    GuildID: String,
    roles: Array
});

module.exports = model("ReactionRoles", reactionRoles);