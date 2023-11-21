const fs = require('fs');
const path = require('path');
const config = require("../../config.json");
const { client, Events, EmbedBuilder } = require("../primary/client");

async function joinMessageLoad() {
    client.on(Events.GuildMemberAdd, async member => {
        const guilda = client.guilds.cache.get(member.guild.id);
        const total_members = await (guilda.members.fetch()).size;
        const channelId = config.welcome;
        const channel = client.channels.cache.get(channelId);
        let avatar = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`
        let embed = new EmbedBuilder()
            .setAuthor({name: member.user.username, iconURL: avatar})
            .setFooter({text: `${member.guild.name}`})
            .setTimestamp()
            .setThumbnail(`${avatar}`)
            .addFields(
                { name: "Bem-vindo", value: `${member.user}, bem-vindo(a) ao servidor **${member.guild.name}**` }
            )
        channel.send({ embeds: [embed] });
        const role = member.guild.roles.cache.get(config.memberRoleId);
        await member.roles.add(role);
    })
}

joinMessageLoad();
