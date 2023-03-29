const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Sends the latency of the bot.'),
	async execute(client, interaction){
		
        interaction.reply({content: `🏓 Latency is ${Math.round(client.ws.ping)}ms.`, ephemeral: true});

	},

}