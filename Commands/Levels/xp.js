const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xp")
        .setDescription("Adjust a user's xp.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand.setName("add")
                .setDescription("Add xp to a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of xp.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("remove")
                .setDescription("Remove xp from a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of xp.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("set")
                .setDescription("Set a user's xp.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of xp.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const { options, guildId } = interaction;

        const sub = options.getSubcommand();
        const target = options.getUser("target");
        const amount = options.getInteger("amount");
        const embed = new EmbedBuilder();

        try {
            switch (sub) {
                case "add":
                    await Levels.appendXp(target.id, guildId, amount);
                    embed.setDescription(`Added ${amount} xp to ${target}.`).setColor("Green").setTimestamp();
                    break;
                case "remove":
                    await Levels.subtractXp(target.id, guildId, amount);
                    embed.setDescription(`Removed ${amount} xp from ${target}.`).setColor("Green").setTimestamp();
                    break;
                case "set":
                    await Levels.setXp(target.id, guildId, amount);
                    embed.setDescription(`Set ${target}'s xp to ${amount}.`).setColor("Green").setTimestamp();
                    break;
            }
        } catch (err) {
            console.log(err);
        }

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}