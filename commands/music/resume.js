const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");
const { PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const guildId = config.guildId;

module.exports = {
	data: new SlashCommandBuilder()
        .setNSFW(false)
		.setName('resume')
        .setDefaultMemberPermissions(PermissionFlagsBits.Speak)
		.setDescription('Retoma a reprodução de musicas'),
    category: 'music',
	async execute(interaction) {
        client.player.resume(guildId);
        interaction.reply("Retomando a reprodução de músicas.");
    },
};