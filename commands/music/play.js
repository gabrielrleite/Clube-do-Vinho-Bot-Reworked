const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");
const { PermissionsBitField, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
        .setNSFW(false)
		.setName('play')
        .setDefaultMemberPermissions(PermissionFlagsBits.Speak)
        .addStringOption(option =>
            option
                .setName("link")
                .setDescription("Link || Nome da Música")
                .setRequired(true))
		.setDescription('Reproduz Musicas'),
    category: 'music',
	async execute(interaction) {
        const { member, options, message } = interaction;
        const query = options.getString('link');
        if(!member.voice.channel) {
            return interaction.reply("Você não está em um canal de voz.").then((msg)=>{setTimeout(()=>{msg.delete();},5000);});
        }
        const success = client.player.play(member.voice.channel, `${query}`,{textChannel: interaction.channel})
        interaction.reply("Música adicionada");
        interaction.deleteReply();
    },
};