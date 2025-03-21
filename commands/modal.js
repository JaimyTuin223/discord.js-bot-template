const { SlashCommandBuilder } = require('discord.js');

// Example of how you can use and handle the modal feature

// This command will be featured in the template at a later date!

// Please check the repository again later, or stay notified via my Discord server!
// https://discord.com/invite/XeqteUmBen

module.exports = {

    data: new SlashCommandBuilder()
		.setName('modals')
		.setDescription('Displays an example modal.'),
	async execute(client, interaction){
		
        return interaction.reply({content: `Coming soon!`, ephemeral: true});

	},
}