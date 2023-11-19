const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");

module.exports = {
	data: new SlashCommandBuilder()
        .setNSFW(false)
		.setName('avatar')
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("Seleciona o avatar de outra pessoa")
                .setRequired(false))
		.setDescription('Mostra o seu avatar'),
    category: 'misc',
	async execute(interaction) {
        const { options, user } = interaction;
        const member = options.getUser('target') || user ;
        const avatar = member.avatar;
        const id = member.id;
        const name = member.globalName || member.username;
        const avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=2048`;

        const embed = new EmbedBuilder()
            .setTitle(`🖼 Avatar de ${name}`)
            .setImage(avatarURL)
            .setTimestamp();

        interaction.reply({embeds: [embed]});
    },
};