const { SlashCommandBuilder } = require('discord.js');

// Example of how you can use and handle the modal feature

module.exports = {

    data: new SlashCommandBuilder()
		.setName('modals')
		.setDescription('Displays an example modal.'),
	async execute(client, interaction){
		
        return interaction.reply({content: `Coming soon!.`, ephemeral: true});

	},
}