const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-logs")
        .setDescription("Set up your logging channel for the audit logs.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Channel for logging messages.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const { channel, guildId, options } = interaction;

        const logChannel = options.getChannel("channel") || channel;
        const embed = new EmbedBuilder();

        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) {
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });

                embed.setDescription("Data was succesfully sent to the database.")
                    .setColor("Green")
                    .setTimestamp();
            } else if (data) {
                logSchema.findOneAndDelete({ Guild: guildId });
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });

                embed.setDescription("Old data was succesfully replaced with the new data.")
                    .setColor("Green")
                    .setTimestamp();
            }

            if (err) {
                embed.setDescription("Something went wrong. Please contact the developers")
                    .setColor("Red")
                    .setTimestamp();
            }

            return interaction.reply({ embeds: [embed], ephemeral: true });
        })
    }
}