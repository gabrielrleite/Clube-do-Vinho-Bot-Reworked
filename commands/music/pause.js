const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");
const { PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const guildId = config.guildId;

module.exports = {
	data: new SlashCommandBuilder()
        .setNSFW(false)
		.setName('pause')
        .setDefaultMemberPermissions(PermissionFlagsBits.Speak)
		.setDescription('Pausa a reprodução de musicas'),
    category: 'music',
	async execute(interaction) {
        client.player.pause(guildId);
        interaction.reply("Pausando a reprodução de músicas.");
    },
};