const connectionMySQL = require('../../modules/primary/database');
const { player, queue } = require("../../modules/secundary/distube");
const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");
const config = require("../../config.json");
const { PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const guildId = config.guildId;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
        .setDefaultMemberPermissions(PermissionFlagsBits.Speak)
        .addNumberOption(option =>
            option
                .setName("number")
                .setDescription("Volume de 0 a 100")
                .setRequired(true))
		.setDescription('Ajuste o volume'),
    category: 'music',
	async execute(interaction) {
        const { options } = interaction;
        const vol = options.getNumber('number');
        async function setarVolume() {
        try {
            const connection = await connectionMySQL.connect();

            const query = `UPDATE music SET volume = ${vol};`;
            const results = await connectionMySQL.executeQuery(connection, query);
            player.setVolume(guildId, vol);

            await connectionMySQL.closeConnection(connection);
        } catch (error) {
            console.error('Erro:', error);
        }
        }
        setarVolume();
        interaction.reply(`Volume definido em ${vol}%`)
        },
    };