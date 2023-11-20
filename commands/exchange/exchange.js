const { client, EmbedBuilder, SlashCommandBuilder } = require("../../modules/primary/client");
const { PermissionsBitField, PermissionFlagsBits } = require("discord.js");
var request = require('request');
const { subDays, isWeekend, format } = require('date-fns');
const Holidays = require('date-holidays');
const config = require("../../config.json");
const guildId = config.guildId;

module.exports = {
	data: new SlashCommandBuilder()
        .setNSFW(false)
		.setName('exchange')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setDescription('Converte moedas para Real(R$)')
        .addStringOption(option =>
            option
                .setName("currency")
                .setDescription("Moeda a ser convertida")
                .setRequired(true)
                .addChoices(
                    { name: "Coroa Dinamarquesa", value: "DKK" },
                    { name: "Coroa Norueguesa", value: "NOK" },
                    { name: "Coroa Sueca", value: "SEK" },
                    { name: "Dólar Australiano", value: "AUD" },
                    { name: "Dólar Canadense", value: "CAD" },
                    { name: "Dólar dos Estados Unidos", value: "USD" },
                    { name: "Euro", value: "EUR" },
                    { name: "Franco Suíço", value: "CHF" },
                    { name: "Iene Japonês", value: "JPY" },
                    { name: "Libra Esterlina", value: "GBP" }
                ))
                
                .addNumberOption(option =>
                    option
                        .setName('value')
                        .setDescription('Quantida a ser convertida')
                        .setRequired(false)),
    category: 'exchange',
	async execute(interaction) {
        const { options } = interaction;
        const moeda = options.getString('currency');
        const multiplicador = options.getNumber('value') || 1;
        function isDiaUtil(data, feriados) {
            if (feriados.isHoliday(data)) {
              return false;
            }
            if (isWeekend(data)) {
              return false;
            }
            return true;
          }
          function ultimoDiaUtil(data, feriados) {
            let dia = subDays(data, 1);
            while (!isDiaUtil(dia, feriados)) {
              dia = subDays(dia, 1);
            }
            return dia;
          }
          const dataAtual = new Date();
          const feriados = new Holidays('BR');
          const ultimoDiaUtilData = ultimoDiaUtil(dataAtual, feriados);
          
          //console.log(`Último dia útil: ${format(ultimoDiaUtilData, 'MM-dd-yyyy')}`);
          const data = format(ultimoDiaUtilData, 'MM-dd-yyyy');
          var url = {
            'method': 'GET',
            'url': `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda=\'${moeda}\'&@dataCotacao=\'${data}\'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json&$select=cotacaoCompra`
          };
          request(url, function (error, response) {
            if (error) throw new Error(error);
            interaction.reply(`${multiplicador} ${moeda} custa R$${((JSON.parse(response.body).value[0].cotacaoCompra) * multiplicador).toFixed(2)}`);
          });

        
    },
};