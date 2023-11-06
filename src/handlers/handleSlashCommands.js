const { REST, Routes, Collection } = require('discord.js');
require('dotenv').config();
const commands = require('./handleCommands.js');

const rest = new REST({version: 10}).setToken(process.env.DISCORD_TOKEN_ACCESS);
const commandsArray = [];

(async () => {
    try {
        
        for(const commandFile of commands.values()) {
            const command = commandFile.data.toJSON();
            commandsArray.push(command)
        }
        const data = rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {body: commandsArray})

        console.log(`Successfully reloaded ${commandsArray.length} application (/) commands.`);
    } catch (error) {
        console.log(`An error has occourred.. oops.. \n${error}`)
    }
})();