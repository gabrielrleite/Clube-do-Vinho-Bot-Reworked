const { PermissionFlagsBits } = require("discord.js");
const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");

module.exports = {
	data: new SlashCommandBuilder()
        .setNSFW(false)
		.setName('clear')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption(option =>
            option
                .setName("amount")
                .setDescription("Quantidade de mensagens para apagar")
                .setRequired(true))
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("Apaga as mensagens de um membro especifico")
                .setRequired(false))
		.setDescription('Deleta mensagens'),
    category: 'admin',
	async execute(interaction) {
        const { channel, options} = interaction
        const msg_delete = options.getNumber('amount');
        const user_tag = options.getUser('target');
        if(msg_delete > 99 || msg_delete < 1) {await interaction.reply("É possivel apagar entre 1 e 99 mensagens por vez.").then((msg)=>{setTimeout(()=>{msg.delete();},2000);}); return;}
        const messages = await channel.messages.fetch({ limit: msg_delete + 1});
        if(user_tag) {
            let i = 0;
            const filtered = [];
            (await messages).filter((msg) =>{
                if(msg.author.id === user_tag.id && msg_delete > i) {
                    filtered.push(msg);
                    i++;
                }
            });
            const msg_deleted = await channel.bulkDelete(filtered, true)

            console.log(msg_deleted.size)
            
            await interaction.reply(`${msg_deleted.size} mensagens de ${user_tag} foram apagadas.`).then((msg)=>{setTimeout(()=>{msg.delete();},2000);});
            return;
        }
        else {
            try {
                const msg_deleted = await channel.bulkDelete(msg_delete, true);
              
                if(msg_deleted.size < msg_delete) {
                    const not_clear = msg_delete - msg_deleted.size;
                    await interaction.reply(`${msg_deleted.size} mensagens foram apagadas. ${not_clear} não foram apagadas por serem muito antigas.`).then((msg)=>{setTimeout(()=>{msg.delete();},2000);});
                } else {
                    await interaction.reply(`${msg_deleted.size} mensagens foram apagadas.`).then((msg)=>{setTimeout(()=>{msg.delete();},2000);});
                }
              } catch (error) {
                if (error.code === 50034) {
                  try {
                    for (const msgId of msg_delete) {
                      const msg = await channel.messages.fetch(msgId);
                      await msg.delete();
                    }
                    if(msg_deleted.size < msg_delete) {
                        const not_clear = msg_delete - msg_deleted.size;
                        await interaction.reply(`${msg_delete.size} mensagens foram apagadas. ${not_clear} não foram apagadas por serem muito antigas.`).then((msg)=>{setTimeout(()=>{msg.delete();},2000);});;
                    } else {
                        await interaction.reply(`${msg_delete.size} mensagens foram apagadas.`).then((msg)=>{setTimeout(()=>{msg.delete();},2000);});
                    }
                  } catch (deleteError) {
                    console.error(`Erro ao excluir mensagens individualmente: ${deleteError.message}`);
                  }
                } else {
                  console.error(`Erro ao responder à interação: ${error.message}`);
                }
              }
              
        }
    }
}