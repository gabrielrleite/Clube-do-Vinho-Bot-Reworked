const { PermissionFlagsBits } = require("discord.js");
const { client, SlashCommandBuilder } = require("../../modules/primary/client");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDescription('Recarrega um comando.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('O comando para recarregar.')
				.setRequired(true)),
	category: 'admin',
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`Não há comando com nome \`${commandName}\`!`);
		}

		delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

		try {
	        interaction.client.commands.delete(command.data.name);
	        const newCommand = require(`../${command.category}/${command.data.name}.js`);
	        interaction.client.commands.set(newCommand.data.name, newCommand);
	        await interaction.reply(`O comando \`${newCommand.data.name}\` foi recarregado!`);
		} catch (error) {
	        console.error(error);
	        await interaction.reply(`Ocorreu um erro ao recarregar um comando \`${command.data.name}\`:\n\`${error.message}\``);
		}
	},
};