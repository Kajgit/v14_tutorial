const { EmbedBuilder } = require("discord.js");

function handleLogs(client) {
    const logSchema = require("../Models/Logs");

    function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            const LogChannel = client.channels.cache.get(data.Channel);
            embed.setTimestamp();
            LogChannel.send({ embeds: [embed] });
        });
    }

    client.on("messageDelete", function (message) {
        if (message.author.bot) return;

        const embed = new EmbedBuilder()
            .setTitle('Message Deleted')
            .setColor('Red')
            .setDescription(`
            **Author : ** <@${message.author.id}> - *${message.author.tag}*
            **Date : ** ${message.createdAt}
            **Channel : ** <#${message.channel.id}> - *${message.channel.name}*
            **Deleted Message : **\`${message.content.replace(/`/g, "'")}\`
         `);

        return send_log(message.guild.id, embed);
    });

    // Channel Topic Updating 
    client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {

        const embed = new EmbedBuilder()
            .setTitle('Topic Updated!')
            .setColor('Green')
            .setDescription(`${channel} Topic changed from **${oldTopic}** to **${newTopic}**`);

        return send_log(channel.guild.id, embed);

    });

    // Channel Permission Updating
    client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {

        const embed = new EmbedBuilder()
            .setTitle('Permission Updated!')
            .setColor('Green')
            .setDescription(channel.name + 's permissions updated!');

        return send_log(channel.guild.id, embed);

    })

    // unhandled Guild Channel Update
    client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Updated!')
            .setColor('Green')
            .setDescription("Channel '" + oldChannel.id + "' was edited but discord-logs couldn't find what was updated...");

        return send_log(oldChannel.guild.id, embed);

    });

    // Member Started Boosting
    client.on("guildMemberBoost", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Started Boosting!')
            .setColor('Pink')
            .setDescription(`**${member.user.tag}** has started boosting  ${member.guild.name}!`);
        return send_log(member.guild.id, embed);

    })

    // Member Unboosted
    client.on("guildMemberUnboost", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Stopped Boosting!')
            .setColor('Pink')
            .setDescription(`**${member.user.tag}** has stopped boosting  ${member.guild.name}!`);

        return send_log(member.guild.id, embed);

    })

    // Member Got Role
    client.on("guildMemberRoleAdd", (member, role) => {

        const embed = new EmbedBuilder()
            .setTitle('User Got Role!')
            .setColor('Green')
            .setDescription(`**${member.user.tag}** got the role \`${role.name}\``);

        return send_log(member.guild.id, embed);

    })

    // Member Lost Role
    client.on("guildMemberRoleRemove", (member, role) => {

        const embed = new EmbedBuilder()
            .setTitle('User Lost Role!')
            .setColor('Red')
            .setDescription(`**${member.user.tag}** lost the role \`${role.name}\``);

        return send_log(member.guild.id, embed);

    })

    // Nickname Changed
    client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {

        const embed = new EmbedBuilder()
            .setTitle('Nickname Updated')
            .setColor('Green')
            .setDescription(`${member.user.tag} changed nickname from \`${oldNickname}\` to \`${newNickname}\``);

        return send_log(member.guild.id, embed);

    })

    // Member Joined
    client.on("guildMemberAdd", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Joined')
            .setColor('Green')
            .setDescription(`Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
                member.user.displayAvatarURL({ dynamic: true }));

        return send_log(member.guild.id, embed);

    });

    // Member Joined
    client.on("guildMemberRemove", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Left')
            .setColor('Red')
            .setDescription(`Member: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
                member.user.displayAvatarURL({ dynamic: true }));

        return send_log(member.guild.id, embed);

    });

    // Server Boost Level Up
    client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {

        const embed = new EmbedBuilder()
            .setTitle('Server Boost Level Up')
            .setColor('Pink')
            .setDescription(`${guild.name} reached the boost level ${newLevel}`);

        return send_log(guild.id, embed);

    })

    // Server Boost Level Down
    client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {

        const embed = new EmbedBuilder()
            .setTitle('Server Boost Level Down')
            .setColor('Pink')
            .setDescription(`${guild.name} lost a level from ${oldLevel} to ${newLevel}`);

        return send_log(guild.id, embed);

    })

    // Banner Added
    client.on("guildBannerAdd", (guild, bannerURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Server Got a new banner')
            .setColor('Green')
            .setImage(bannerURL)

        return send_log(guild.id, embed);

    })

    // AFK Channel Added
    client.on("guildAfkChannelAdd", (guild, afkChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('AFK Channel Added')
            .setColor('Green')
            .setDescription(`${guild.name} has a new afk channel ${afkChannel}`);

        return send_log(guild.id, embed);

    })

    // Guild Vanity Add
    client.on("guildVanityURLAdd", (guild, vanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Link Added')
            .setColor('Green')
            .setDescription(`${guild.name} has a vanity link ${vanityURL}`);

        return send_log(guild.id, embed);

    })

    // Guild Vanity Remove
    client.on("guildVanityURLRemove", (guild, vanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Link Removed')
            .setColor('Red')
            .setDescription(`${guild.name} has removed its vanity URL ${vanityURL}`);

        return send_log(guild.id, embed);

    })

    // Guild Vanity Link Updated
    client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Link Updated')
            .setColor('Green')
            .setDescription(`${guild.name} has changed its vanity URL from ${oldVanityURL} to ${newVanityURL}!`);

        return send_log(guild.id, embed);

    })

    // Message Pinned
    client.on("messagePinned", (message) => {

        const embed = new EmbedBuilder()
            .setTitle('Message Pinned')
            .setColor('Grey')
            .setDescription(`${message} has been pinned by ${message.author}`);

        return send_log(message.guild.id, embed);

    })

    // Message Edited
    client.on("messageContentEdited", (message, oldContent, newContent) => {

        const embed = new EmbedBuilder()
            .setTitle('Message Edited')
            .setColor('Grey')
            .setDescription(`Message Edited from \`${oldContent}\` to \`${newContent}\` by ${message.author}`);

        return send_log(message.guild.id, embed);

    })

    // Role Position Updated
    client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Position Updated')
            .setColor('Green')
            .setDescription(role.name + " role was at position " + oldPosition + " and now is at position " + newPosition);

        return send_log(role.guild.id, embed);

    })

    // Role Permission Updated
    client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Permission Updated')
            .setColor('Green')
            .setDescription(role.name + " had as permissions " + oldPermissions + " and now has as permissions " + newPermissions);

        return send_log(role.guild.id, embed);

    })

    // Avatar Updated
    client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Avatar Updated')
            .setColor('Green')
            .setDescription(`${user.tag} updated avatar from [Old Avatar](${oldAvatarURL}) to [New Avatar(${newAvatarURL})]`);

        return send_log(user.guild.id, embed);

    })

    // Username Updated
    client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {

        const embed = new EmbedBuilder()
            .setTitle('Username Updated')
            .setColor('Green')
            .setDescription(`${user.tag} updated their username from ${oldUsername} to ${newUsername}`);

        return send_log(user.guild.id, embed);

    })

    // Discriminator Updated
    client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {

        const embed = new EmbedBuilder()
            .setTitle('Discriminator Updated')
            .setColor('Green')
            .setDescription(`${user.tag} updated their discriminator from ${oldDiscriminator} to ${oldDiscriminator}`);

        return send_log(user.guild.id, embed);

    })

    // Flags Updated
    client.on("userFlagsUpdate", (user, oldFlags, newFlags) => {

        const embed = new EmbedBuilder()
            .setTitle('Flags Updated')
            .setColor('Green')
            .setDescription(`${user.tag} updated their flags from ${oldFlags} to ${newFlags}`);

        return send_log(user.guild.id, embed);

    })

    // Joined VC
    client.on("voiceChannelJoin", (member, channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Joined')
            .setColor('Green')
            .setDescription(member.user.tag + " joined " + `${channel}` + "!");

        return send_log(member.guild.id, embed);

    })

    // Left VC
    client.on("voiceChannelLeave", (member, channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Left')
            .setColor('Red')
            .setDescription(member.user.tag + " left " + `${channel}` + "!");

        return send_log(member.guild.id, embed);

    })

    // VC Switch
    client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Switched')
            .setColor('Green')
            .setDescription(member.user.tag + " left " + oldChannel.name + " and joined " + newChannel.name + "!");

        return send_log(member.guild.id, embed);

    })

    // VC Mute
    client.on("voiceChannelMute", (member, muteType) => {

        const embed = new EmbedBuilder()
            .setTitle('User Muted')
            .setColor('Red')
            .setDescription(member.user.tag + " became muted! (type: " + muteType + ")");

        return send_log(member.guild.id, embed);

    })

    // VC Unmute
    client.on("voiceChannelUnmute", (member, oldMuteType) => {

        const embed = new EmbedBuilder()
            .setTitle('User Unmuted')
            .setColor('Green')
            .setDescription(member.user.tag + " became unmuted!");

        return send_log(member.guild.id, embed);

    })

    // VC Defean
    client.on("voiceChannelDeaf", (member, deafType) => {

        const embed = new EmbedBuilder()
            .setTitle('User Deafend')
            .setColor('Red')
            .setDescription(member.user.tag + " become deafed!");

        return send_log(member.guild.id, embed);

    })

    // VC Undefean
    client.on("voiceChannelUndeaf", (member, deafType) => {

        const embed = new EmbedBuilder()
            .setTitle('User Undeafend')
            .setColor('Green')
            .setDescription(member.user.tag + " become undeafed!");

        return send_log(member.guild.id, embed);

    })

    // User Started to Stream
    client.on("voiceStreamingStart", (member, voiceChannel) => {


        const embed = new EmbedBuilder()
            .setTitle('User Started to Stream')
            .setColor('Green')
            .setDescription(member.user.tag + " started streaming in " + voiceChannel.name);

        return send_log(member.guild.id, embed);

    })

    // User Stopped to Stream
    client.on("voiceStreamingStop", (member, voiceChannel) => {


        const embed = new EmbedBuilder()
            .setTitle('User Stopped to Stream')
            .setColor('Red')
            .setDescription(member.user.tag + " stopped streaming in " + voiceChannel.name);

        return send_log(member.guild.id, embed);
    });

    // Member Became Offline
    client.on("guildMemberOffline", (member, oldStatus) => {

        const embed = new EmbedBuilder()
            .setTitle('User Offline')
            .setColor('Green')
            .setDescription(member.user.tag + " went offline!");

        return send_log(member.guild.id, embed);

    });

    // Member Became Online
    client.on("guildMemberOnline", (member, newStatus) => {

        const embed = new EmbedBuilder()
            .setTitle('User Online')
            .setColor('#2F3136')
            .setDescription(member.user.tag + " was offline and is now " + newStatus + "!");

        return send_log(member.guild.id, embed);

    });

    // Role Created
    client.on("roleCreate", (role) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Added')
            .setColor('Red')
            .setDescription(`Role: ${role}\nRolename: ${role.name}\nRoleID: ${role.id}\nHEX Code: ${role.hexColor}\nPosition: ${role.position}`);

        return send_log(role.guild.id, embed);

    });

    // Role Deleted
    client.on("roleDelete", (role) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Deleted')
            .setColor('Red')
            .setDescription(`Role: ${role}\nRolename: ${role.name}\nRoleID: ${role.id}\nHEX Code: ${role.hexColor}\nPosition: ${role.position}`);

        return send_log(role.guild.id, embed);

    });

    // User Banned
    client.on("guildBanAdd", ({guild, user}) => {

        const embed = new EmbedBuilder()
            .setTitle('User Banned')
            .setColor('Red')
            .setDescription(`User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
                user.displayAvatarURL({ dynamic: true }));

        return send_log(guild.id, embed);

    });

    // User Unbanned
    client.on("guildBanRemove", ({guild, user}) => {

        const embed = new EmbedBuilder()
            .setTitle('User Unbanned')
            .setColor('Green')
            .setDescription(`User: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
                user.displayAvatarURL({ dynamic: true }));

        return send_log(guild.id, embed);

    });

    // Channel Created
    client.on("channelCreate", (channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Created')
            .setColor('Green')
            .setDescription(`${channel.name} has been created.`);

        return send_log(channel.guild.id, embed);

    });

    // Channel Deleted
    client.on("channelDelete", (channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Deleted')
            .setColor('Red')
            .setDescription(`${channel.name} has been deleted.`);

        return send_log(channel.guild.id, embed);

    });
}

module.exports = { handleLogs };

// this code will be in the description
