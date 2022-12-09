const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("howmuchxp")
        .setDescription("See how much xp a level takes to reach.")
        .addIntegerOption(option =>
            option.setName("level")
                .setDescription("Desired level.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const level = options.getInteger("level");

        const xpAmount = Levels.xpFor(level);

        interaction.reply({ content: `You need ${xpAmount} xp to reach level ${level}.`, ephemeral: true });
    }
}