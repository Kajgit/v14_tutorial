const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle, ActionRowBuilder } = require("discord.js");
const suggestionSchema = require("../../Models/Suggestion");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Place a suggestion.")
        .addStringOption(option =>
            option.setName("type")
                .setDescription("Select an option.")
                .setRequired(true)
                .addChoices(
                    { name: "Youtube Video", value: "Youtube" },
                    { name: "Discord", value: "Discord" },
                    { name: "Patreon", value: "Patreon" },
                    { name: "Services", value: "Services" },
                    { name: "Other", value: "Other" },
                )
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Describe your suggestion clearly.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { options, guildId, member, user, guild } = interaction;

        const type = options.getString("type");
        const description = options.getString("description");

        const channel = guild.channels.cache.get("1033927456756879370"); // only non-multi-guilded part

        const embed = new EmbedBuilder()
            .setColor("Orange")
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: "Suggestion:", value: description, inline: false },
                { name: "Type:", value: type, inline: true },
                { name: "Status:", value: "Pending", inline: true },
            )
            .setTimestamp();

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("suggest-accept").setLabel("Accept").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("suggest-decline").setLabel("Decline").setStyle(ButtonStyle.Danger), // you can use this format, but I will change it to this:
        );

        try {
            const m = await channel.send({ embeds: [embed], components: [buttons], fetchReply: true });
            await channel.send({ content: "Use `/suggest` in the bot-commands channel to submit your suggestion. " });
            await interaction.reply({ content: "Suggestion was succesfully sent to the channel.", ephemeral: true });

            await suggestionSchema.create({
                GuildID: guildId, MessageID: m.id, Details: [
                    {
                        MemberID: member.id,
                        Type: type,
                        Suggestion: description
                    }
                ]
            });
        } catch (err) {
            console.log(err);
        }
    }
}