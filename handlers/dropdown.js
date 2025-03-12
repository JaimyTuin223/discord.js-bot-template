// This function handles the Selectmenu interaction type. (Dropdown components)
// It will be available as import accross the project, due to the module.exports line.

async function handleSelectmenuInteraction(interaction, client) {
    if (interaction.user.id !== interaction.customId.split('_')[1]) return interaction.reply({ content: `You do not have permission to use this button.`, ephemeral: true }) // Filter to only allow the assigned user to use the button.


    if (interaction.customId.includes('delivery_')) { // If its the delivery button from Commands/SelectMenus.js
        let selectedUserOptions = interaction.values // Returns UserIDs

        let usernames = [] // This will hold all the usernames to send in the message.
        const promises = selectedUserOptions.map(async (userId) => {
            const member = await interaction.guild.members.fetch(userId); // Fetch retrieves data from the Discord API, this will be returned as a "Promise".
            usernames.push(`${member?.user?.username}`); // Add the username to the usernames array.
        });
        await Promise.all(promises); // Wait until all promises are processed.

        // Return a message with the set information to the user.
        return interaction.message.edit({ content: `Your hamburger will be delivered to the following people:\r\n${usernames.join(', ')}`, components: [] })
    }
}

// Make the function available to import accross the project with: const { handleSelectmenuInteraction } = require(" filepath to this function ")
module.exports = { handleSelectmenuInteraction };