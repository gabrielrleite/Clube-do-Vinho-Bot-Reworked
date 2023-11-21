const fs = require('fs');
const path = require('path');
const config = require("../../config.json");
const { client, Events, EmbedBuilder } = require("../primary/client");

async function leaveMessageLoad() {
    client.on(Events.GuildMemberRemove, async member => {
        const channelId = config.byebye;
        const channel = client.channels.cache.get(channelId);
        let avatar = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`
        let embed = new EmbedBuilder()
            .setAuthor({name: member.user.username, iconURL: avatar})
            .setFooter({text: `${member.guild.name}`})
            .setTimestamp()
            .setThumbnail(`${avatar}`)
            .addFields(
                { name: "Adeus!", value: `${member.user} saiu do servidor **${member.guild.name}**` }
            )
        channel.send({ embeds: [embed] });
    })
}

leaveMessageLoad();
