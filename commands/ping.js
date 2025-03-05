const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Sends the latency of the bot.'),
	async execute(client, interaction){
		
        return interaction.reply({content: `🏓 Latency is ${Math.round(client.ws.ping)}ms.`, ephemeral: true});

	},

}