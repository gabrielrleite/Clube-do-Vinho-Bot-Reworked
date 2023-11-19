const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Tempo de atividade'),
    category: 'misc',
	async execute(interaction) {
        function obterTempoDeAtividade() {
            const tempoDeAtividadeSegundos = process.uptime();
            const dias = Math.floor(tempoDeAtividadeSegundos / (60 * 60 * 24));
            const horas = Math.floor((tempoDeAtividadeSegundos % (60 * 60 * 24)) / (60 * 60));
            const minutos = Math.floor((tempoDeAtividadeSegundos % (60 * 60)) / 60);
            const segundos = Math.floor(tempoDeAtividadeSegundos % 60);
          
            return { dias, horas, minutos, segundos };
          }
          const tempoFormatado = obterTempoDeAtividade();
          const tempo = new EmbedBuilder()
            .setTitle("Tempo de atividade 🕰️")
            .setColor("#ff0000")
            .addFields(
                { name: "**Estou online há:**", value: `🗓️ ${tempoFormatado.dias} dias \n🗓️ ${tempoFormatado.horas} horas\n🗓️ ${tempoFormatado.minutos} minutos\n🗓️ ${tempoFormatado.segundos} segundos.`}
            )
            .setTimestamp()
		await interaction.reply({ embeds: [tempo]});
	},
};