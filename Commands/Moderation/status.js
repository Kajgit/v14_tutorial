const {

  Client,

  SlashCommandBuilder,

  ChatInputCommandInteraction,

  EmbedBuilder,

} = require("discord.js");

const os = require("os");

const actualTime = require("humanize-duration");

const { connection } = require("mongoose");

module.exports = {

  developer: true,

  data: new SlashCommandBuilder()

    .setName("status")

    .setDescription("Shows the bot's status."),

  /**

   * @param {ChatInputCommandInteraction} interaction

   * @param {Client} client

   */

  async execute(interaction, client) {

    const model = os.cpus()[0].model;

    const cores = os.cpus().length;

    const platform = os.platform();

    await client.application.fetch();

    const embed = new EmbedBuilder()

      .setColor("Grey")

      .setTitle(`${client.user.username} | Status`)

      .addFields(

        { name: "**Client**", value: "🔷 Online", inline: true },

        { name: "**Ping**", value: `${client.ws.ping}ms`, inline: true },

        {

          name: "**Uptime**",

          value: `${actualTime(client.uptime)}`,

          inline: true,

        },

        {

          name: "**Database**",

          value: `${switchTo(connection.readyState)}`,

          inline: true,

        },


        {

          name: "**Currently serving**",

          value: `${client.guilds.cache.size} servers`,

          inline: true,

        },

        {

          name: "**Active since**",

          value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,

          inline: true,

        },

        {

          name: "**Owner**",

          value: `${client.application.owner || "None"}`,

          inline: true,

        },

        {

          name: "**OS**",

          value: platform.replace("win32", "Windows").replace("linux", "Linux"),

          inline: true,

        },

        {

          name: "**CPU**",

          value: `${model} with ${cores} cores`,

          inline: true,

        },

        {

          name: "**Memory Usage**",

          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(

            2

          )}%`,

          inline: true,

        }

      )

      .setThumbnail(

        client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })

      )

      .setTimestamp();

    return interaction.reply({ embeds: [embed] });

  },

};

function switchTo(val) {

  var status = " ";

  switch (val) {

    case 0:

      status = "🟥 Disconnected";

      break;

    case 1:

      status = `🔷 Connected`;

      break;

    case 2:

      status = `🟨 Connecting`;

      break;

    case 3:

      status = `🟨 Disconnecting`;

      break;

  }

  return status;

}
