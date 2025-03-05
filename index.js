
const { Client, Routes, GatewayIntentBits, Collection, Interaction, ActivityType, discord } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildIntegrations] });
const config = require("./config.json")

const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '10' }).setToken(config.token);
const fs = require("fs");

// Handlers
const { handleSelectmenuInteraction } = require('./handlers/dropdown.js')

// Commands
client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());

    console.log(`[Command] - ${command.data.name}.js has loaded.`);
}

client.once("ready", async () => {
    console.log(`${client.user.username} is online.`);  // Logs when the bot goes online. 

    client.user.setPresence({ // Set the activity status
        activities: [{
            name: `Discord.js v14 example!`, // The text to display
            type: ActivityType.Custom // Playing, listening, etc.
        }],
        status: 'online' // status (online, idle, etc.)
    });


    // Registering slash commands to Discord.
    // (async () => {
    //     try {
    //         console.log(`Started refreshing application (/) commands.`)

    //         const data = await rest.put(
    //             Routes.applicationCommands(client.user.id),
    //             { body: commands },
    //         )

    //         console.log(`Successfully reloaded application (/) commands.`)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // })();
    // I suggest commenting or disabling the registering code when running alot of tests. A high amount of registrations might get blocked by Discord.
});


client.on("interactionCreate", async interaction => {

    if (interaction.isCommand()) {

        const command = client.commands.get(interaction.commandName); // Getting the right command file to execute 
        if (!command) return; // If interaction isn't a slashCommand return

        try {

            await command.execute(client, interaction); // Try to execute the command

        } catch (err) { // Catch if something goes wrong, and if so, return an error to the user.
            await interaction.reply({ content: `An error has occured.\r\n${err}`, ephemeral: true });
        }

    }

    if (interaction.isAnySelectMenu()) {
        handleSelectmenuInteraction(interaction, client)
    }
    
})

client.login(config.token) // Log in as the bot 
