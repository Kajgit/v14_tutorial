const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Get the leaderboard from the rank system."),
    async execute(interaction, client) {

        const { guildId } = interaction;

        const rawLeaderboard = await Levels.fetchLeaderboard(guildId, 10);

        if (rawLeaderboard.length < 1) return interaction.reply("Noboy's in the leaderboard yet.");

        const embed = new EmbedBuilder();

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `**${e.position}.** ${e.username}#${e.discriminator}\n**Level:** ${e.level}\n**XP:** ${e.xp.toLocaleString()}`);

        embed.setTitle("Leaderboard").setDescription(lb.join("\n\n")).setTimestamp();

        return interaction.reply({ embeds: [embed] });

    }, // the level table in the database is automatically created
};