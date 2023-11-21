const fs = require('fs');
var request = require('request');
const path = require('path');
const { client, Events, EmbedBuilder } = require("../modules/primary/client");

async function messageLoad() {
    client.on(Events.MessageCreate, async message => {
        var options = {
            'method': 'POST',
            'url': 'https://anti-fish.bitflow.dev/check',
            'headers': {
                'User-Agent': 'TiozeraGames Bot',
                'Content-Type': 'application/json'
            },
            body: `{"message":"${message}"}`
        
            };
            request(options, function (error, response) {
            if (error) throw new Error(error);
                if(JSON.parse(response.body).match) {
                    if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                        message.delete();
                    } else {
                        message.guild.bans.create(message.member.id, {
                            deleteMessageSeconds: 1 * 60 * 60,
                            reason: `Anti-Phishing: ${message.content}`
                        });
                    };
                };
            });
          if(message.content === `<@${client.user.id}>`) {
            let embed = new EmbedBuilder()
                .setTitle("Hey, Você me mencionou.. 😉")
                .setColor('Purple')
                .setDescription(`Código desenvolvido por <@311531938286534656> | [***Código Fonte***](https://github.com/gabrielrleite/Clube-do-Vinho-Bot-Reworked)
                
                Meu nome é **${client.user.username}**
                Meu prefixo é \`/\`
                `)
                .setTimestamp()
            message.reply({ embeds: [embed]})
          }
    })
}

messageLoad();
