const { SlashCommandBuilder, ChannelType } = require('discord.js');

// Example of the different interaction options you can configure

module.exports = {
    data: new SlashCommandBuilder()
        .setName('options')
        .setDescription('Preview of the options feature on discord.js')
        .addStringOption(option =>
            option.setName('multiplechoice')
                .setDescription('Multiple set values for the user to select')
                .setRequired(true)
                .addChoices(
                    { name: "option1", value: "value1" },
                    { name: "option2", value: "value2" }
                ))
        .addChannelOption(option =>
            option.setName('channeloption')
                .setDescription('A list of channels for the user to choose from')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            // Includes other options like DM, GroupDM, guildVoice and more! (Bot does require access to the channels to display them)
        )
        .addStringOption(option =>
            option.setName('freeinput')
                .setDescription('Allows the user to fill in a value themselves.')
                .setRequired(false)
        ),
    async execute(client, interaction) {
        // Receive user input and assign it to a variable (These use the .setName field value)
        const multipleChoice = interaction.options.getString('multiplechoice')
        const freeInput = interaction.options.getString('multiplechoice')
        const channel = interaction.options.getChannel('channeloption');

        return interaction.reply({ content: `You chose ${multipleChoice}, with value ${freeInput}, for channel ${channel}.`, ephemeral: true });

    },
}