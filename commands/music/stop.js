const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");
const { PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const guildId = config.guildId;

module.exports = {
	data: new SlashCommandBuilder()
        .setNSFW(false)
		.setName('stop')
        .setDefaultMemberPermissions(PermissionFlagsBits.Speak)
		.setDescription('Para de reproduzir musicas'),
    category: 'music',
	async execute(interaction) {
        client.player.stop(guildId);
        interaction.reply("Parando a reprodução de músicas.");
    },
};