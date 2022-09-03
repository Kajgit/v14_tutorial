const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember, Embed} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const {user, guild} = member;
        const welcomeChannel = member.guild.channels.cache.get('1011076507545894912');
        const welcomeMessage = `Welcome <@${member.id}> to the guild!`;
        const memberRole = '1011082103435313305';

        const welcomeEmbed = new EmbedBuilder()
        .setTitle("**New member!**")
        .setDescription(welcomeMessage)
        .setColor(0x037821)
        .addFields({name:'Total members', value: `${guild.memberCount}`})
        .setTimestamp();

        welcomeChannel.send({embeds: [welcomeEmbed]});
        member.roles.add(memberRole);
    }
}