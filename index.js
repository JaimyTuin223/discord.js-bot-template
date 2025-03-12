
// Dependencies and variables
const { Client, Routes, GatewayIntentBits, Collection, Interaction, ActivityType } = require("discord.js") 
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildIntegrations] });
const config = require("./config.json")

const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '10' }).setToken(config.token);
const fs = require("fs");

// Handlers - Functions imported from the /handlers folder.
const { handleSelectmenuInteraction } = require('./handlers/dropdown.js') // Dropdown interaction handler

// Creating the slash commands 
client.commands = new Collection(); 
const commands = []; // Array to hold the slash commands. (To be uploaded to Discord later in the code)
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js")); // Get all commands. (filters on the .js filetype)

// For every found command:
for (const file of commandFiles) {
    const command = require(`./commands/${file}`); // Get the command content

    client.commands.set(command.data.name, command); // Set the required data
    commands.push(command.data.toJSON()); // Push the command data to the commands array

    console.log(`[Command] - ${command.data.name}.js has loaded.`); // Log that the command has been processed correctly
}


// This event fires when the bot is online and connected to Discord.
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
    (async () => {
        try {
            console.log(`Started refreshing application (/) commands.`)

            const data = await rest.put( // Upload the commands array to Discord. (From earlier in the code)
                Routes.applicationCommands(client.user.id),
                { body: commands },
            )

            console.log(`Successfully reloaded application (/) commands.`)
        } catch (error) {
            console.error(error)
        }
    })();
    // I suggest commenting or disabling the registering code when running alot of tests.
    // A high amount of registrations might get blocked by Discord.
});


// This event fires when an application interaction. (Slashcommand, modal, button, etc.)
client.on("interactionCreate", async interaction => {

    // Command handling
    if (interaction.isCommand()) {

        const command = client.commands.get(interaction.commandName); // Getting the right command file to execute 
        if (!command) return; // If interaction isn't a slashCommand return

        try {

            await command.execute(client, interaction); // Try to execute the command

        } catch (err) { // Catch if something goes wrong, and if so, return an error to the user.
            await interaction.reply({ content: `An error has occured.\r\n${err}`, ephemeral: true });
        }

    }

    // Select menu handling
    if (interaction.isAnySelectMenu()) {
        handleSelectmenuInteraction(interaction, client) // Function in the /handlers folder
    }
    
})

client.login(config.token) // Log in as the bot 
