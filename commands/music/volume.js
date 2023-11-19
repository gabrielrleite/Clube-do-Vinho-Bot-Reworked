const connectionMySQL = require('../../modules/primary/database');
const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Ajuste o volume'),
    category: 'music',
	async execute(interaction) {

        async function exemploConsulta() {
        try {
            const connection = await connectionMySQL.connect();

            const usuarioId = "volume";
            const query = 'SELECT volume FROM music';
            const results = await connectionMySQL.executeQuery(connection, query, [usuarioId]);

            console.log('Resultados da consulta:', results);

            await interaction.reply(`${await JSON.stringify(results[0].volume)}`);

            await connectionMySQL.closeConnection(connection);
        } catch (error) {
            console.error('Erro:', error);
        }
        }
        exemploConsulta();
        },
    };