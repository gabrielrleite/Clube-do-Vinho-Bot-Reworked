const { Collection, Client, EmbedBuilder, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates, // Adicione o intent GuildVoiceStates
  ] });

client.once(Events.ClientReady, c => {
	console.log(`\x1b[32m[LOG]\x1b[0m Pronto! Conectado como ${c.user.tag}`);
});

client.commands = new Collection();

client.login(global.token);

module.exports = { Events, client, EmbedBuilder, SlashCommandBuilder};