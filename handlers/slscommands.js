const fs = require('fs');
const path = require('path');
const config = require("../config.json");
const { client } = require("../modules/primary/client");
const { REST, Routes } = require('discord.js');

async function slscommands_load() {
    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
    const commands = [];
    const commandsPath = 'commands';
    const commandsSubPath = fs.readdir(commandsPath, (err, folders) => {
        if(err) {
            console.error("Erro ao ler a pasta: ", err);
            return;
        }
        for(let i = 0; i < folders.length; i++) {
            const commandFiles = fs.readdir(commandsPath + "/" + folders[i], (err, files) => {
                if(err) {
                    console.error("Erro ao ler a pasta: ", err);
                    return;
                }
                for(let b = 0; b < files.length; b++) {
                    const filePath = `../${commandsPath}/${folders[i]}/${files[b]}`;
                    const command = require(filePath);
                    if ('data' in command && 'execute' in command && 'category' in command) {
                        client.commands.set(command.data.name, command);
                        commands.push(command.data.toJSON());
                    } else {
                        console.log(`\x1b[31m[AVISO]\x1b[0m O comando \x1b[33m${files[b]}\x1b[0m está faltando uma propriedade "data", "execute" ou "category" obrigatória.`);
                    }
                }
                const { token, clientId, guildId } = config;
                const rest = new REST().setToken(token);

                (async () => {
                    await sleep(1000);
                    try {
                        console.log(`\x1b[32m[LOG]\x1b[0m Começou a atualizar ${commands.length} comandos do aplicativo (/).`);
                
                        const data = await rest.put(
                            Routes.applicationGuildCommands(clientId, guildId),
                            { body: commands },
                        );
                
                        console.log(`\x1b[32m[LOG]\x1b[0m Recarregado com sucesso ${data.length} comandos do aplicativo (/).`);
                    } catch (error) {
                        console.error(error);
                    }
                })();
            })
        };
    })
};

slscommands_load();