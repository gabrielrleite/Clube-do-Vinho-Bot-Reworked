const fs = require('fs');
const path = require('path');
const { client, Events } = require("../modules/primary/client");

async function interaction_load() {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
            
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`);
                await interaction.reply({ content: `Nenhum comando correspondente a ***${interaction.commandName}*** foi encontrado.`, ephemeral: true});
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
                }
            }
            })
}

interaction_load();