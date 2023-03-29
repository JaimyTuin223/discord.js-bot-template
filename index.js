
const { Client, GatewayIntentBits, Collection, Interaction, ActivityType, discord } = require("discord.js")
const botConfig = require("./botConfig.json")
const fs = require("fs");

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildIntegrations] });

client.slashCommands = new Collection();
const slashCommands = []; 

const commandSlashFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const fileSlash of commandSlashFiles) {

    const commandSlash = require(`./commands/${fileSlash}`);

    client.slashCommands.set(commandSlash.data.name, commandSlash);
    slashCommands.push(commandSlash.data.toJSON());

    console.log(`${commandSlash.data.name}.js has loaded.`);

}

client.once("ready", async () => {
    console.log(`${client.user.username} is online.`);
    client.user.setPresence({ activities: [{ name: `V14 bot example.`, type: ActivityType.Playing }], status: 'online' })  // Seting the status of the bot.


// Registering slash commands to Discord.
    const clientId = '856486420235288597'; // Your bot's ID
    const rest = new REST({ version: '10' }).setToken(botConfig.token); 

    (async () => {
        try {
            console.log(`Started refreshing application (/) commands.`)

            const data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: slashCommands },
            )

            console.log(`Successfully reloaded application (/) commands.`)
        } catch (error) {
            console.error(error)
        }
    })();

});
// 


client.on("interactionCreate", async interaction => {

    if (interaction.isCommand()) {

        const slashCommand = client.slashCommands.get(interaction.commandName); // Getting the right command file to execute 
        if (!slashCommand) return; // If interaction isn't a slashCommand return

        try {

            await slashCommand.execute(client, interaction); // Try to execute the command

        } catch (err) { // Catch if something goes wrong, and if so, return an error to the user.
            await interaction.reply({ content: `An error has occured. ${err}`, ephemeral: true });
        }

    }
})

client.login(botConfig.token) // Logging in 