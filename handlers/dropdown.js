

async function handleSelectmenuInteraction(interaction, client) {
    if (interaction.user.id !== interaction.customId.split('_')[1]) return interaction.reply({ content: `You do not have permission to use this button.`, ephemeral: true }) // Filter to only allow the assigned user to use the button.

    if (interaction.customId.includes('delivery_')) { // If its the delivery button from Commands/SelectMenus.js
        let selectedUserOptions = interaction.values // Returns UserIDs

        let usernames = []
        const promises = selectedUserOptions.map(async (userId) => {
            const member = await interaction.guild.members.fetch(userId);
            usernames.push(`${member?.user?.username}`);
        });
        await Promise.all(promises);

        return interaction.message.edit({ content: `Your hamburger will be delivered to the following people:\r\n${usernames.join(', ')}`, components: [] })
    }
}

module.exports = { handleSelectmenuInteraction };