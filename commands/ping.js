const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Sends the latency of the bot.'),
	async execute(client, interaction){
		
		// Calculates the reaction time between the bot and the Discord API
        return interaction.reply({content: `🏓 Latency is ${Math.round(client.ws.ping)}ms.`, ephemeral: true});

	},

}