const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, WebhookClient } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
    execute(interaction) {

        const id = '1034893966648295475';
        const token = "7VHogetLs-ZaohGBIkRMbPeou4PqssmpkOz_0ULTrZUts8-JWpu1H6XE-MQUXqZVEyDI";

        const webhookClient = new WebhookClient({ id: id, token: token });

        webhookClient.send({
            content: 'Webhook test',
            username: 'some-username',
            avatarURL: 'https://i.imgur.com/AfFp7pu.png',
        });

        interaction.reply({ content: "success" });
    },
};