const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, SlashCommandBuilder, ActionRowBuilder, InteractionCollector } = require('discord.js');

// Showcasing the select menu components feature, which function as dropdown menus for the user

// Below is a list of the different types of select menus.
// UserSelectMenuBuilder		-- Adds all server members as the input options
// RoleSelectMenuBuilder		-- Adds all server roles as the input options
// StringSelectMenuBuilder		-- Shows the configured string values as options
// ChannelSelectMenuBuilder		-- Adds all server channels as the input options (can be filtered)

module.exports = {

	data: new SlashCommandBuilder()
		.setName('dropdown')
		.setDescription('Sends an example dropdown menu.'),
	async execute(client, interaction) {

		let menuId = `${interaction.user.id}_${new Date().getTime()}`
		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId(`hamburger_${menuId}`)
			.setPlaceholder('Select your toppings!')
			.setMinValues(1)
			.setMaxValues(4)
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Lettuce')
					.setDescription('Add lettuce.')
					.setValue('lettuce'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Cheese')
					.setDescription('Add cheese.')
					.setValue('cheese'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Onion')
					.setDescription('Add onions.')
					.setValue('onion'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Meat')
					.setDescription('Add the meat.')
					.setValue('meat'),
			);

		// Create the action row (Maximum of 1 dropdown per action row)
		const burgerRow = new ActionRowBuilder().addComponents(selectMenu);

		interaction.reply({ content: `Create your own hamburger!`, components: [burgerRow] });

		// Interaction collector
		const collector = new InteractionCollector(client, { interactionType: 3, guild: interaction.guild })
		collector.on("collect", async (selectInteraction) => {

			if (!selectInteraction.isAnySelectMenu()) return collector.stop(); // Accepts all select menus

			setTimeout(() => { // Stop the collector after the timeout has ended.
				collector.stop();
			}, 180000);

			if (selectInteraction.customId == `hamburger_${menuId}`) {
				let selectedOptions = selectInteraction.values // Returns an array with the selected values

				const userSelectMenu = new UserSelectMenuBuilder()
					.setCustomId(`delivery_${menuId}`)
					.setPlaceholder('Select people to deliver to!')
					.setMinValues(1)
					.setMaxValues(4);

				const userRow = new ActionRowBuilder().addComponents(userSelectMenu);

				return selectInteraction.reply({ content: `Your hamburger contains the following ingredients:\r\n Bread, ${selectedOptions.join(', ')}`, components: [userRow] })
				// The actions taken on this selectmenu will be taken in the dropdown handler (/handlers/dropdown.js)!
				// This is to show the different methods of how you can make your code handle interaction events.
			}
		})
	},
}