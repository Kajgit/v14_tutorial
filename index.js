const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const YoutubePoster = require("discord-youtube");
const logs = require("discord-logs");

const { handleLogs } = require("./Handlers/handleLogs");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

logs(client, {
  debug: true
});

client.ytp = new YoutubePoster(client, {
  loop_delay_in_min: 1
});
client.commands = new Collection();
client.config = require("./config.json");

client.login(client.config.token).then(() => {
  handleLogs(client);
  loadEvents(client);
  loadCommands(client);
});

module.exports = client;
