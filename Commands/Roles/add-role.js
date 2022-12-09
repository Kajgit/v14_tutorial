const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addrole")
        .setDescription("Add custom reaction role.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Role to be assigned")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Description of the role.")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("emoji")
                .setDescription("Emoji for the role.")
                .setRequired(false)
        ),
    async execute(interaction) {
        const { options, guildId, member } = interaction;

        const role = options.getRole("role");
        const description = options.getString("description");
        const emoji = options.getString("emoji");

        try {

            if (role.position >= member.roles.highest.position)
                return interaction.reply({ content: "I don't have permissions for that.", ephemeral: true });

            const data = await rrSchema.findOne({ GuildID: guildId });

            const newRole = {
                roleId: role.id,
                roleDescription: description || "No description.",
                roleEmoji: emoji || "",
            }

            if (data) {
                let roleData = data.roles.find((x) => x.roleId === role.id);

                if (roleData) {
                    roleData = newRoleData;
                } else {
                    data.roles = [...data.roles, newRole]
                }

                await data.save();
            } else {
                await rrSchema.create({
                    GuildID: guildId,
                    roles: newRole,
                });
            }

            return interaction.reply({ content: `Created new role **${role.name}**` });

        } catch (err) {
            console.log(err);
        }
    }
}