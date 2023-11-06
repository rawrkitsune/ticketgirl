const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ModalBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const fs = require('fs')
const path = require('path');
const dbPath = path.join(__dirname, '../db/')

const getDb = (guildId) => {
    const dbFile = JSON.parse(fs.readFileSync(`${dbPath}/${guildId}.json`))
    return dbFile;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Deletes the tickets system (cannot be undone).')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        console.log(interaction.guildId)
        await interaction.reply({content: 'Delete', ephemeral: true})
    }
}