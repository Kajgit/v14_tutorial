const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    const { customId, values, guild, member } = interaction; // you need to destructure values from interaction first to use it below
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({ content: "outdated command" });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {

      if (customId == "verify") {
        const role = interaction.guild.roles.cache.get("1011041531114815579");
        return interaction.member.roles.add(role).then((member) =>
          interaction.reply({
            content: `${role} has been assigned to you.`,
            ephemeral: true,
          })
        );
      }
    } else if (interaction.isSelectMenu()) {
      if (customId == "reaction-roles") {
        for (let i = 0; i < values.length; i++) {
          const roleId = values[i];

          const role = guild.roles.cache.get(roleId);
          const hasRole = member.roles.cache.has(roleId);

          switch (hasRole) {
            case true:
              member.roles.remove(roleId);
              break;
            case false:
              member.roles.add(roleId);
              break;
          }
        }

        interaction.reply({ content: "Roles updated.", ephemeral: true });
      }
    } else {
      return;
    }
  },
};