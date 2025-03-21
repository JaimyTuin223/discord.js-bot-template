
# Discord.js bot template

This is a simple to understand open-source template for building your own Discord bot using Node.js and the latest Discord.js version.
Whether you're a beginner or not, this template offers a great starting point to create your own fully functional bot.

> [!Note]
> New example commands are still being worked on, check back later for more features!

## First time setup

### Node modules
Installing the correct packages can be done with the following npm command:

```bash
  npm i
```
##### To be able to run this code locally your device will need to have Node.JS installed, which can be found [here](https://nodejs.org/en/download)

### Bot token
Make sure to create a new file named `config.json` in the main file path of your project!
This should look something like this: 

![alt text](https://spud.jaimytuin.com/media/projectShowcase/configExample.png)

In this file you can store the bot token for the code to use.
```json
  {
    "token": "Bot token here"
  }
```
The `.gitignore` file can be removed from your project folder.
    
## Deployment

To run the code and make your Discord bot available run the following command in an intergrated terminal.

```bash
  node index.js
```


## Features

- Based on a recent Discord.JS version
- Slash command registering and handling
- Customisable bot presence 
- Code explanation in the code files


## Feedback

If you find any bugs or issues with the code, please ask your question in my discord server [here](https://discord.gg/8KxqWAKCPe)
#### If you wish to keep it private you can also DM me after joining the server (@jaimytuin)