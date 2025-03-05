const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Showcasing the button components feature

module.exports = {

    data: new SlashCommandBuilder()
		.setName('buttons')
		.setDescription('Sends a message with the different button types.'),
	async execute(client, interaction){

        // General information:
        //  .setCustomId()           The id of the button, can not be identical as another button.
        //  .setDisabled()
        //  .setStyle()
        //  .setEmoji()

        // This button has the different button types
        const buttonRow1 = new ActionRowBuilder().addComponents( // Maximum amount of buttons per row is 5
            new ButtonBuilder()
                .setCustomId('button1')
                .setLabel("Primary")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId('button2')
                .setLabel("Secondary")
                .setEmoji('✨')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId('button3')
                .setLabel("Danger")
                .setStyle(ButtonStyle.Danger)
                .setDisabled(false),
            new ButtonBuilder()
                .setCustomId('button4')
                .setLabel("Success")
                .setStyle(ButtonStyle.Success)
                .setDisabled(false),
            new ButtonBuilder()
                .setLabel("URL")
                .setStyle(ButtonStyle.Link) // Link does not allow customId and requires a .setURL() value
                .setURL('https://spud.jaimytuin.com/'),
        );

        // This row has 2 disabled buttons
        const buttonRow2 = new ActionRowBuilder().addComponents( // Maximum amount of buttons per row is 5
            new ButtonBuilder()
                .setCustomId('button1disabled')
                .setLabel("Primary")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),
            new ButtonBuilder()
                .setCustomId('button2disabled')
                .setLabel("Success")
                .setEmoji('✅')
                .setStyle(ButtonStyle.Success)
                .setDisabled(true),

            // Add emoji button as example
        );
		
        return interaction.reply({ content: `Button example.`, components: [buttonRow1, buttonRow2] });

	},
}